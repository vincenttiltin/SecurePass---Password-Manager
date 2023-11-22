import { useNavigate } from "react-router-dom";
import { useState } from "react";
/**
 * Get JSX elements for form that allows for deletion of users.
 * @param {*} props Properties that contain function that sets deleted user
 * @returns JSX elements representing form for deleting a user
 */
function DeleteUserForm(props) {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "DELETE",
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
            props.setDeleted(result);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
            <span>Username</span>
            <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)} />
            </label>
            
            <br/><br/>
           {username && <button type="submit">Delete User</button>}
        </form>
    );
}

export { DeleteUserForm };