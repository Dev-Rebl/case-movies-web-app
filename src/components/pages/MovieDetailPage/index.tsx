import { useGetMovieByIdQuery } from '@services/moviedb'
import { useParams } from 'react-router-dom';
import { ErrorPage } from '@components/pages';

export const MovieDetailPage = () => {
    const { id } = useParams<"id">();

    const {
        data,
        error,
        isSuccess,
        isFetching,
    } = useGetMovieByIdQuery(id || 0)

    if(error) return <ErrorPage />;

    return (
        <>
            {isFetching ? 'loading...' : ''}

            {isSuccess ? (
                <div key={data.id}>
                    {data.title}
                </div>
            ) : null}
        </>
    )
}
