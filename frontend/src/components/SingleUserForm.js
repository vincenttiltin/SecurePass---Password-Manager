import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./formFormatting.css"
/**
 * Get JSX user form for getting a user.
 * @param {*} props Properties that contain function that sets found user.
 * @returns JSX elements representing form for finding a user.
 */
function SingleUserForm(props) {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        };

        const response = await fetch(`http://localhost:1339/users/${username}`, requestOptions);
        const result = await response.json();
        if (response.status === 400) {
            navigate("/", { state: { errorMessage: result.errorMessage } });
        }
        else if (response.status === 500) {
            navigate("/usererror", { state: { errorMessage: result.errorMessage } });
        }
        else {
            props.setUser(result);
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <label>
            <span >Username</span>
            <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)} />
            </label>
            
            <br/><br/>
           <button type="submit">Get User</button>  
        </form>
    );
}

export { SingleUserForm };