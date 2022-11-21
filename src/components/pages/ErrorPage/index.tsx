import { Link } from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <div>
            <h2>Whoopsie daisy! This page does not exist.</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
};
