const DB_CONSOLE_LOGS = true
export const query = async (query: string) => {
    DB_CONSOLE_LOGS && console.log(query)
    const result = await window.promiseWorker.postMessage({
        type: 'sql',
        query: query,
    })
    return result
}

export const exec = async (query: string) => {
    DB_CONSOLE_LOGS && console.log(query)

    window.promiseWorker.postMessage({ type: 'exec', query: query })
}

export const exportDB = async () => {
    const exportedDB: Uint8Array = await window.promiseWorker.postMessage({
        type: 'export',
    })
    console.log(exportedDB)
    return exportedDB
}

export const getAllMovies = async () => {
    const movies = await query('select * from movie')
    return movies
}

export const getMovieById = async (id: string | number) => {
    const res = await query(`
    select movie.*,
    dop.name as dop,
    production_designer.name as production_designer,
    costume_designer.name as costume_designer,
    json_group_array(movie_image.image_url) as images
    from movie 
join movie_image on movie.id = movie_image.movie_id
join director_of_photography as dop on dop.id = movie.dop_id
join production_designer on production_designer.id = movie.production_designer_id
join costume_designer on costume_designer.id = movie.costume_designer_id
where movie.id = ${id}
group by movie.id
`)
    const currentMovie = res.map((movie) => ({
        ...movie,
        images: JSON.parse(movie.images),
    }))
    DB_CONSOLE_LOGS && console.log(currentMovie)
    return currentMovie[0]
}

export const getSomeMovies = async () => {
    const res = await query(`
        select movie.*,
                dop.name as dop,
                production_designer.name as production_designer,
                costume_designer.name as costume_designer,
                json_group_array(movie_image.image_url) as images
                from movie 
        join movie_image on movie.id = movie_image.movie_id
        join director_of_photography as dop on dop.id = movie.dop_id
        join production_designer on production_designer.id = movie.production_designer_id
        join costume_designer on costume_designer.id = movie.costume_designer_id
        group by movie.id
        limit 10
    `)
    const movies = res.map((movie) => ({
        ...movie,
        images: JSON.parse(movie.images),
    }))
    DB_CONSOLE_LOGS && console.log(movies)
    return movies
}

export const getRandomVideo = async () => {
    // const res = await query('select count(*) as sign_count from sign')
    // // DB_CONSOLE_LOGS && console.log(res)
    // const count = parseInt(res[0].sign_count)
    // // DB_CONSOLE_LOGS && console.log(count)
    // const index = Math.floor(Math.random() * count)
    // // DB_CONSOLE_LOGS && console.log(index)
    // const signs = await query(`select * from sign limit 1 offset ${index}`)
    const videos = await query(`select * from video order by random() limit 1`)
    DB_CONSOLE_LOGS && console.log(videos[0])
    return videos[0].id
}

export const getDataFromSheets = async ({
    range = 'A1:Z999',
    table,
    sheetId = '178hiGb8CV0VNdupQZ_Btfmxns4FKjR0zfyi-dweOwFs',
    jsonColumns = [],
}: {
    range?: string
    table: string
    sheetId?: string
    jsonColumns?: string[]
}) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
    const data = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${table}!${range}?key=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            const [header, ...rows] = data.values
            return rows.map((row: string[], idx: number) => {
                return Object.fromEntries([
                    ...row.map((val: string, idx: number) => {
                        if (header[idx] == 'date') {
                            return [header[idx], new Date(val)]
                        }
                        if (header[idx] in jsonColumns) {
                            return [header[idx], JSON.parse(val)]
                        }
                        return [header[idx], row[idx]]
                    }),
                    ['id', idx],
                ])
            })
        })
    return data
}

export const getShowsDataFromSheets = async () => {
    const A = 1
    const Z = 999
    const range = `Shows!A${A}:Z${Z}`
    const sheetId = '178hiGb8CV0VNdupQZ_Btfmxns4FKjR0zfyi-dweOwFs'
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
    // let shows = []
    const shows: {
        name: string
        date: Date
        bands: string[]
        venue: string
        id: number | string
        image: string
    }[] = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
    )
        .then((res) => res.json())
        .then((data) => {
            console.log({ data })
            const [header, ...rows] = data.values
            console.log({ header, rows })
            return rows.map((row: string[], idx: number) => {
                return Object.fromEntries([
                    ...row.map((val: string, idx: number) => {
                        if (header[idx] == 'date') {
                            return [header[idx], new Date(val)]
                        }
                        if (header[idx] == 'bands') {
                            return [header[idx], JSON.parse(val)]
                        }
                        return [header[idx], row[idx]]
                    }),
                    ['id', idx],
                ])
            })
        })
    return shows.sort((a, b) => a.date - b.date)
}
