import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "./App";
//import { Button } from "react-bootstrap";
import Button from "@mui/material/Button";

/**
 * the button to logout the user
 * @returns a react component with the logout button
 */
function LogoutButton() {
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    const performLogout = async () => {
        try {
            const requestOptions = {
                method: "GET",
                credentials: "include",
            };
            const response = await fetch("http://localhost:1339/session/logout", requestOptions);
                alert("Hope you had a good session");
                setIsLoggedIn(false);
                return;
        } catch (error) {
            alert("An error occured. Logging out on front-end anyways.")
        }
    };

    return (
        <Button variant="contained" color="error" size="md" onClick={performLogout}>
            Logout
        </Button>
    );
}

export { LogoutButton };