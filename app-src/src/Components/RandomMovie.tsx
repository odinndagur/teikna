import { Navigate, useMatch } from '@tanstack/react-location'
import { movieGenerics } from './MoviePage'

export function RandomMovie() {
    const {
        data: { movie },
    } = useMatch()
    console.log({ movie })
    return (
        <Navigate
            to={`/movies/${movie.id}`}
            replace
            search={(old) => ({ ...old })}
        />
    )
}
