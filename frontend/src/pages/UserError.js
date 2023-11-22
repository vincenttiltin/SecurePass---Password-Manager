import {Link, useLocation} from "react-router-dom";

/**
 * Get User Error JSX component to render when User error occurs.
 * @param {string} errorMessage User error message to display in header
 * @returns JSX user error output elements to render.
 */
function UserError() {
    const {state} = useLocation();

    return (
        <div>
            <h1>The was an input error</h1>
            <p>{state.errorMessage}</p>
            <Link to="/">Home</Link>
        </div>
    );
}

export {UserError};