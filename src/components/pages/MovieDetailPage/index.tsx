import { useGetMovieByIdQuery } from '@services/moviedb';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '@components/pages';
import { Header } from './Header';

export const MovieDetailPage = () => {
    const { id } = useParams<'id'>();

    const { error } = useGetMovieByIdQuery(id || 0);

    if (error) return <ErrorPage />;

    return (
        <Header />
    );
};
