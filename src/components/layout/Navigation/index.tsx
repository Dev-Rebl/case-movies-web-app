import { Link, NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import cx from 'classnames';
import { ReactComponent as TMDBLogo } from '@/assets/tmdb.svg';
import { ReactComponent as Cross } from '@/assets/icons/cross.svg';
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';

export const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <Link to="/" className={styles.logo}>
                <TMDBLogo className={styles.icon} />
            </Link>

            <ul className={styles.list}>
                <li className={styles.listItem}>
                    <NavLink to="/search"
                        className={({ isActive }) => cx(styles.link, {
                            [styles.active]: isActive
                        })}
                    >
                        <SearchIcon className={styles.listItemIcon} />
                        <span>Search</span>
                    </NavLink>
                </li>

                <li className={styles.listItem}>
                    <NavLink to="/nothing-here"
                        className={({ isActive }) => cx(styles.link, {
                            [styles.active]: isActive
                        })}
                    >
                        <Cross className={styles.listItemIcon} />
                        <span>Error</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
