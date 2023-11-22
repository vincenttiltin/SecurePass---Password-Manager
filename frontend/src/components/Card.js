import "components/Card.css";

/**
 * Get JSX elements for a component wrapped in a card
 * @param {*} children JSX elements containing user information
 * @returns JSX user elements to render with Card styling
 */
function Card({ children}) {
    return (
        <div className="card">
            {children}
        </div>
    );
}
export {Card};