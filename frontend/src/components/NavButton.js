import { NavLink, useResolvedPath, useMatch } from "react-router-dom";
import Button from "@mui/material/Button";

/**
 * Get NavButton component for rendering top menu buttons.
 * @param {*} props Properties that contain header menu button labels and corresponding links.
 * @returns JSX NavLink button element to render in top menu.
 */
function NavButton(props) {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <NavLink to={props.to}>
            <Button color="success" variant={match ? "contained" : "outlined"}>{props.label}</Button>
        </NavLink>
    );
}

export { NavButton };