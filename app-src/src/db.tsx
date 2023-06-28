const DB_CONSOLE_LOGS = true

type movieJson = {
    id: number
    title: string
    director: string
    director_of_photography: string
    production_designer: string
    costume_designer: string
    year: number
    images: string
}

type movie = {
    id: number
    title: string
    director: string
    director_of_photography: string
    production_designer: string
    costume_designer: string
    year: number
    images: string[]
}

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
    const currentMovie: movie[] = res.map((movie: movieJson) => ({
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
    const movies: {
        title: string
        director: string
        director_of_photography: string
        production_designer: string
        costume_designer: string
        year: number
        images: string[]
    }[] = res.map((movie: movieJson) => ({
        ...movie,
        images: JSON.parse(movie.images),
    }))
    DB_CONSOLE_LOGS && console.log(movies)
    return movies
}

export const searchMovies = async (searchValue?: string) => {
    const res = await query(`
        select movie.id, movie.title, movie.year,
        director,
        director_of_photography,
        production_designer,
        costume_designer,
        json_group_array(movie_image.image_url) as images
        from movie 
        join movie_image on movie.id = movie_image.movie_id
        --join director_of_photography as dop on dop.id = movie.dop_id
        --join production_designer on production_designer.id = movie.production_designer_id
        --join costume_designer on costume_designer.id = movie.costume_designer_id
        join movie_fts on movie_fts.id = movie.id
        ${searchValue ? 'where movie_fts match "' + searchValue + '*"' : ''}
        group by movie.id
        order by levenshtein(movie.title,"${searchValue}")
        limit 100
    `)
    const movies: movie[] = res.map((movie: movieJson) => ({
        ...movie,
        year: Number(movie.year),
        images: JSON.parse(movie.images),
    }))
    DB_CONSOLE_LOGS && console.log(movies)
    return movies
}

export const getRandomMovie = async () => {
    // const res = await query('select count(*) as sign_count from sign')
    // // DB_CONSOLE_LOGS && console.log(res)
    // const count = parseInt(res[0].sign_count)
    // // DB_CONSOLE_LOGS && console.log(count)
    // const index = Math.floor(Math.random() * count)
    // // DB_CONSOLE_LOGS && console.log(index)
    // const signs = await query(`select * from sign limit 1 offset ${index}`)
    const movies = await query(`select * from movie order by random() limit 1`)
    DB_CONSOLE_LOGS && console.log(movies[0])
    return movies[0]
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
    //@ts-ignore
    return shows.sort((a, b) => a.date - b.date)
}

const isImgUrl = (url: string) => {
    return /\.(jpe?g|png|webp|avif|gif)$/.test(url)
}

export const fetchImagesFromSub = async (sub: string, after?: string) => {
    const baseUrl = 'https://api.reddit.com/r/'
    const urlSuffix = '.json'

    const fullUrl = baseUrl + sub + urlSuffix + (after ? '?after=' + after : '')
    DB_CONSOLE_LOGS && console.log({ fullUrl })
    return await fetch(fullUrl, { mode: 'no-cors' })
        .then((res) => res.json())
        .then((d) => {
            if (!d.data) {
                return { after: '', images: [] }
            }
            const after = d.data.after
            const images = d.data.children
                .map((child: any) => {
                    let imgUrl = child.data.url
                    if (isImgUrl(imgUrl)) {
                        console.log(imgUrl)
                        return imgUrl
                    }
                })
                .filter(Boolean)
            return { images, after }
        })
}

export const fetchImagesFromSubExpress = async (subs: string) => {
    const res = await fetch(
        `http://46.22.111.71/?subreddits=${encodeURIComponent(subs)}&reset`,
        {}
    )
    console.log({ res })
    const images: string[] = await res.json()
    console.log(images)
    return images
}
