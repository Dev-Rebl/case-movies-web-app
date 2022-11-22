import { getGenreNames } from '@/utils';
import { Button } from '@components/Button';
import { Card, Grid } from '@components/general';
import { useAppSelector } from '@hooks';
import { useGetGenresQuery, useGetUpcomingMoviesQuery } from '@services/moviedb';

export const HomePage = () => {
    const currentPage = useAppSelector((state) => state.counter.value);

    const { data, error, isSuccess, isFetching } = useGetUpcomingMoviesQuery(currentPage);

    const { data: genreData, isSuccess: genreSucces } = useGetGenresQuery();

    return (
        <>
            {isSuccess ? (
                <Grid>
                    {data?.results?.map((upcomingMovie) => {
                        const genresString =
                            genreSucces && upcomingMovie.genre_ids?.length
                                ? getGenreNames(upcomingMovie.genre_ids, genreData.genres).join(' · ')
                                : '';

                        return (
                            <Card
                                key={upcomingMovie.id}
                                title={upcomingMovie.title}
                                alternativeTitle={genresString}
                                subtitle={`Release: ${upcomingMovie.release_date}`}
                                image={`https://www.themoviedb.org/t/p/w440_and_h660_face${upcomingMovie.poster_path}`}
                                to={`/movie/${upcomingMovie.id}`}
                            />
                        );
                    })}
                </Grid>
            ) : null}

            <Button disabled={(isSuccess && !data.has_more_pages) || isFetching}>page is</Button>

            {isFetching ? 'loading...' : ''}
        </>
    );
};
