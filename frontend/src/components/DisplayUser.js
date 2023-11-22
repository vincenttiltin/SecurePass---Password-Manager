import { Card } from "./Card";

/**
 * Get JSX elements for displaying a user within a card.
 * @param {*} props Properties that contain user information and heading for section to render
 * @returns 
 */
function DisplayUser(props) {

    return (
        <Card>
            <h1>{props.heading}</h1>
            <h2>Url: {props.user.url}</h2>
            <h2>Username: {props.user.username}</h2>
            <h2>Password: {props.user.password}</h2>
            
        </Card>
    );
}
export { DisplayUser };