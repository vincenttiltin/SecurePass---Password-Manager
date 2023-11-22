import { useState } from "react";
import { useEffect } from "react";
import { SignUpForm } from "./SignUpForm";
import { useNavigate } from "react-router-dom";

/**
 * Get JSX user form for adding a user and render a card displaying the added user when a user is added.
 * @param {*} setDisplay Function that sets what to display within a component
 * @returns Set of AddUserForm JSX elements to render
 */
function SignUp() {
    const [added, setAdded] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (added) { // Only update display when a user has been added
            alert("New Account created;");    
            navigate("/");
        }
    });


    return (
        <>
            <SignUpForm setAdded={setAdded} />
        </>
    );
}

export { SignUp };