import { useState } from "react";
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "./App";

/**
 * the form to login a user into the password manager
 * @returns a react component containing form
 */
function LoginForm() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const requestOptions = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            };
            const response = await fetch("http://localhost:1339/session/login", requestOptions);
            if (response.status === 200) {
                alert("Thanks for loggin in");
                setIsLoggedIn(true);
                navigate("/");
            } else {
                setIsLoggedIn(false);
                alert("Invalid login, try again");
            }
        } catch (error) {
            alert("An error occured, try again");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
            <br />
            {username && password && <button type="submit">Submit</button>}
        </form>
        
    );
}

export { LoginForm };

