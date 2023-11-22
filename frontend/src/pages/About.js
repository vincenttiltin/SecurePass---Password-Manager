import { useParams } from "react-router-dom";

/**
 * Get About section JSX
 * @returns JSX element to render for the About section information.
 */
function About() {
    const { employee } = useParams();

    return (
        <div>
            <h1>We are the best password manager.</h1>
        </div>
    );
}

export { About };