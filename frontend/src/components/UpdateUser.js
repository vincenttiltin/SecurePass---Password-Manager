import { useState } from "react";
import { UpdateUserForm } from "./UpdateUserForm";
import { DisplayUser } from "./DisplayUser"
import { useEffect } from "react";

/**
 * Get JSX user form for updating a user and render a card displaying the user updated if that occurs.
 * @param {*} setDisplay Function that sets what to display within a component.
 * @returns Set of UpdateUserForm JSX elements to render.
 */
function UpdateUser({ setDisplay }) {
    const [updated, setUpdated] = useState(null);

    useEffect(() => {
        if (updated) { // Only update display when a user has been added
            setDisplay(<DisplayUser user={updated}
                heading="The updated user is" />);
        }
    }, [updated, setDisplay]);


    return (
        <>
            <UpdateUserForm setUpdated={setUpdated} />
        </>
    );
}

export { UpdateUser };