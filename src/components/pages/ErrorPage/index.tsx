import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export const ErrorPage = () => {
    return (
        <div className={styles.error}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>
                    <div>Whoopsie daisy!</div>
                    This page does not exist.
                </h2>

                <p className={styles.text}>
                    <Link to="/">Go to the home page</Link>
                </p>
            </div>
        </div>
    );
};
