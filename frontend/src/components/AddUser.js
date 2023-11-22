import { useState } from "react";
import { AddUserForm } from "./AddUserForm";
import { DisplayUser } from "./DisplayUser";
import { useEffect } from "react";

/**
 * Get JSX user form for adding a user and render a card displaying the added user when a user is added.
 * @param {*} setDisplay Function that sets what to display within a component
 * @returns Set of AddUserForm JSX elements to render
 */
function AddUser({ setDisplay }) {
    const [added, setAdded] = useState(null);

    useEffect(() => {
        if (added) { // Only update display when a user has been added
            setDisplay(<DisplayUser user={added}
                heading="The added user is" />);
        }
    }, [added, setDisplay]);


    return (
        <>
            <AddUserForm setAdded={setAdded} />
        </>
    );
}

export { AddUser };