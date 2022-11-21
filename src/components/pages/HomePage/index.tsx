import { Button } from '@components/Button'
import { Card, Grid } from '@components/general'
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

            {isSuccess ?
                <Grid>
                    {data?.results?.map((upcomingMovie, index) => (
                        <Card key={upcomingMovie.id}
                            title={upcomingMovie.title}
                            alternativeTitle={JSON.stringify(upcomingMovie.genre_ids)}
                            subtitle={`Release: ${upcomingMovie.release_date}`}
                            image={`https://www.themoviedb.org/t/p/w440_and_h660_face${upcomingMovie.backdrop_path}`}
                            to={`/movie/${upcomingMovie.id}`}
                        />
                    ))}
                </Grid>
                : null}
        </>
    )
}
