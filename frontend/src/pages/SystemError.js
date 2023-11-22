import {Link} from "react-router-dom";

/**
 * Get System Error JSX component to render when System error occurs.
 * @param {string} errorMessage System error message to display in header
 * @returns JSX system error output elements to render.
 */
function SystemError({errorMessage}) {
    return (
        <div>
            <h1>Oops! There was a system error</h1>
            <p>{errorMessage}</p>
            <Link to="/">Home</Link>
        </div>
    );
}

export {SystemError};