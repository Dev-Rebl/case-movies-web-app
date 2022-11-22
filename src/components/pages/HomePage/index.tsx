import { getGenreNames } from '@/utils';
import { Card, Grid } from '@components/general';
import { useGetGenresQuery, useGetUpcomingMoviesQuery } from '@services/moviedb';
import { useEffect, useRef, useState } from 'react';

export const HomePage = () => {
    const lastCardRef = useRef<HTMLAnchorElement>(null);
    const intersectionObserverRef = useRef<IntersectionObserver>();

    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isSuccess, isFetching } = useGetUpcomingMoviesQuery(currentPage);

    const { data: genreData, isSuccess: genreSucces } = useGetGenresQuery();

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
            if (lastCardRef.current) {
                intersectionObserverRef.current?.unobserve(lastCardRef.current);
            }

            if (isSuccess) {
                setCurrentPage((prev) => data.has_more_pages ? prev + 1 : prev);
            }
        }
    };

    useEffect(() => {
        if (!isFetching) {
            intersectionObserverRef.current = new IntersectionObserver(callbackFunction, {
                rootMargin: "0px 0px 200px 0px",
                threshold: 1
            });
            if (lastCardRef.current) intersectionObserverRef.current.observe(lastCardRef.current);
        }

        return () => {
            if (lastCardRef.current) intersectionObserverRef.current?.unobserve(lastCardRef.current);
        };

    }, [lastCardRef, isFetching]);

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

                        return (
                            <Card
                                ref={isLastItem ? lastCardRef : null}
                                key={upcomingMovie.id}
                                title={upcomingMovie.title}
                                alternativeTitle={genresString}
                                subtitle={`Release: ${upcomingMovie.release_date}`}
                                image={upcomingMovie.poster_path && `https://www.themoviedb.org/t/p/w440_and_h660_face${upcomingMovie.poster_path}`}
                                to={`/movie/${upcomingMovie.id}`}
                            />
                        );
                    })}
                </Grid>
            ) : null}
            {isFetching ? 'loading...' : ''}
        </>
    );
};
