import { Link } from "react-router-dom"

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/nothing-here">Nothing Here</Link>
                </li>
            </ul>
        </nav>
    )
}
