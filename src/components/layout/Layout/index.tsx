import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import styles from './styles.module.scss';

export const Layout = () => {
    return (
        <>
            <Navigation />

            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    );
};
