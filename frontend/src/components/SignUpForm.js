import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./formFormatting.css";
/**
 * Get JSX user form for adding a user.
 * @param {*} props Properties that contain function that sets added user
 * @returns JSX elements representing form for adding a user
 */
function SignUpForm(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };

    const response = await fetch("http://localhost:1339/login/register", requestOptions);
    const result = await response.json();
    if (response.status === 400) {
      navigate("/", { state: { errorMessage: result.errorMessage } });
    } else if (response.status === 500) {
      navigate("/usererror", { state: { errorMessage: result.errorMessage } });
    } else {
      props.setAdded(result);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />

      <label>
        <span>Password</span>
        <input
          type="text"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <br />
      <br />
     {username && password  && <button type="submit">Add User</button>}
    </form>
  );
}

export { SignUpForm };
