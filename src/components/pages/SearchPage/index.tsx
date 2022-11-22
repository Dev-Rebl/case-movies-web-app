import { createImageUrl, getGenreNames } from '@/utils';
import { Card, Grid } from '@components/general';
import { useGetGenresQuery, useSearchMovieQuery } from '@services/moviedb';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from './Header';

export const SearchPage = () => {
    const lastCardRef = useRef<HTMLAnchorElement>(null);
    const intersectionObserverRef = useRef<IntersectionObserver>();
    const [search, setSearch] = useSearchParams('');
    const [currentPage, setCurrentPage] = useState(1);

    const query = useMemo(() => {
        return search.get('query') || ''
    }, [search])

    const { data, isSuccess, isFetching } = useSearchMovieQuery({ query: query, page: currentPage });
    const { data: genreData, isSuccess: genreSucces } = useGetGenresQuery();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({ query: e.target.value });
    };

    const debouncedChangeHandler = useMemo((
        () => debounce(changeHandler, 300)
    ), []);

    useEffect(() => {
        return () => {
            debouncedChangeHandler.cancel();
        };
    });

    // Start Infinite scrolling logic
    
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

    // End Infinite scrolling logic


    return (
        <>
            <Header handleChange={debouncedChangeHandler} defaultValue={query} />

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
                                key={`${upcomingMovie.id}_${index}`}
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
