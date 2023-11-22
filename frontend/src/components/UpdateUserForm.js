import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./formFormatting.css"
/**
 * Get JSX user form for updating a user.
 * @param {*} props Properties that contain function that sets updated user.
 * @returns JSX elements representing form for updating a user.
 */
function UpdateUserForm(props) {
    const [oldUsername, setOldUsername] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [newUsername, setNewUsername] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify({
                oldUsername: oldUsername,
                oldPassword: oldPassword,
                newUsername: newUsername,
                newPassword: newPassword,
            }),
            credentials: "include",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };
        const response = await fetch("http://localhost:1339/users", requestOptions);
        const result = await response.json();
        if (response.status === 400) {
            navigate("/", { state: { errorMessage: result.errorMessage } });
        }
        else if (response.status === 500) {
            navigate("/usererror", { state: { errorMessage: result.errorMessage } });
        }
        else {
            props.setUpdated(result);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
            <span>Current Username</span>
            <input type="text" placeholder="Current Username..." onChange={(e) => setOldUsername(e.target.value)} />
            </label>
            <label>
            <span>Current Password</span>
            <input type="text" placeholder="Current Password..." onChange={(e) => setOldPassword(e.target.value)} />
            </label>
            <label>
            <span>New Username</span>
            <input type="text" placeholder="New Username..." onChange={(e) => setNewUsername(e.target.value)} />
            </label>
            <label>
            <span>New Password</span>
            <input type="text" placeholder="New Password..." onChange={(e) => setNewPassword(e.target.value)} />
            </label>
            <br/><br/>
            {oldUsername && newUsername && newPassword && <button type="submit">Update User</button>}
        </form>
    );
}

export { UpdateUserForm };