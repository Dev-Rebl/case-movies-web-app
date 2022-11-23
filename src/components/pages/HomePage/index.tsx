import { createImageUrl, getGenreNames } from '@/utils';
import { Card, Grid } from '@components/general';
import { useInfiniteScroll } from '@hooks';
import { useGetGenresQuery, useGetUpcomingMoviesQuery } from '@services/moviedb';
import { useEffect, useRef, useState } from 'react';

export const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isSuccess, isFetching } = useGetUpcomingMoviesQuery(currentPage);

    const { data: genreData, isSuccess: genreSucces } = useGetGenresQuery();

    const lastCardRef = useInfiniteScroll<HTMLAnchorElement>({
        observeWhen: !isFetching,
        onIntersect() {
            if (isSuccess) {
                setCurrentPage((prev) => data.has_more_pages ? prev + 1 : prev);
            }
        },
    });

    // allign the currentPage with the page value of the data
    useEffect(() => {
        if (data?.page && data.page > currentPage) {
            setCurrentPage(data.page);
        }
    }, [data, currentPage]);

    return (
        <>
            {isSuccess ? (
                <Grid>
                    {data?.results?.map((upcomingMovie, index) => {
                        const isLastItem = data.results.length - 1 === index;

                        const genresString =
                            genreSucces && upcomingMovie.genre_ids?.length
                                ? getGenreNames(upcomingMovie.genre_ids, genreData.genres).join(' · ')
                                : '';

                        const imageUrl = createImageUrl.poster(upcomingMovie.poster_path)
                            || createImageUrl.backdrop(upcomingMovie.backdrop_path);

                        return (
                            <Card
                                ref={isLastItem ? lastCardRef : null}
                                key={upcomingMovie.id}
                                title={upcomingMovie.title}
                                alternativeTitle={genresString}
                                subtitle={`Release: ${upcomingMovie.release_date}`}
                                image={imageUrl}
                                to={`/movie/${upcomingMovie.id}`}
                            />
                        );
                    })}
                </Grid>
            ) : null}
        </>
    );
};
