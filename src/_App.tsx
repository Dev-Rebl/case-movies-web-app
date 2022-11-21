import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import { HomePage, MovieDetailPage, ErrorPage } from '@components/pages';
import { Layout } from '@components/layout';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path="/movie/:id" element={<MovieDetailPage />} />

                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};

export default App;
