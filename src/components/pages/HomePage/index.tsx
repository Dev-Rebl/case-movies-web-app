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
            <Button disabled={(isSuccess && !data.has_more_pages) || isFetching}>page is</Button>

            {isFetching ? 'loading...' : ''}

            {isSuccess ? (
                <Grid>
                    {data?.results?.map((upcomingMovie, index) => {
                        const genresString =
                            genreSucces && upcomingMovie.genre_ids?.length
                                ? upcomingMovie.genre_ids.reduce((acc, curr, index) => {
                                      const separator = index > 0 ? ', ' : ' ';
                                      return `${acc}${separator}${genreData.genres[curr].name}`;
                                  }, '')
                                : '';

                        return (
                            <Card
                                key={upcomingMovie.id}
                                title={upcomingMovie.title}
                                alternativeTitle={genresString}
                                subtitle={`Release: ${upcomingMovie.release_date}`}
                                image={`https://www.themoviedb.org/t/p/w440_and_h660_face${upcomingMovie.backdrop_path}`}
                                to={`/movie/${upcomingMovie.id}`}
                            />
                        );
                    })}
                </Grid>
            ) : null}
        </>
    );
};
