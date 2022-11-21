import { Button } from '@components/Button'
import { useAppSelector } from '@hooks'
import { useGetUpcomingMoviesQuery } from '@services/moviedb'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export const HomePage = () => {
    const currentPage = useAppSelector((state) => state.counter.value)

    const {
        data,
        error,
        isSuccess,
        isFetching,
    } = useGetUpcomingMoviesQuery(currentPage)

    return (
        <>
            <Button disabled={isSuccess && !data.has_more_pages || isFetching} >
                page is
            </Button>

            {isFetching ? 'loading...' : ''}

            {isSuccess ? data?.results?.map(upcomingMovie => (
                <div key={upcomingMovie.id}>
                    <Link to={`/movie/${upcomingMovie.id}`}>
                        {upcomingMovie.title}
                    </Link>
                </div>
            )) : null}
        </>
    )
}
