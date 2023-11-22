import { useState } from "react";
import { DisplayUser } from "./DisplayUser";
import { SingleUserForm } from "./SingleUserForm";
import { useEffect } from "react";

/**
 * Get JSX user form for getting a user and render a card displaying the user found if that occurs.
 * @param {*} setDisplay Function that sets what to display within a component.
 * @returns Set of SingleUserForm JSX elements to render.
 */
function SingleUser({ setDisplay }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user) { // Only update display when a user has been found
            setDisplay(<DisplayUser user={user}
                heading="The found user is" />);
        }
    }, [user, setDisplay]);

    return (
        <>
            <SingleUserForm setUser={setUser} />
        </>
    );

}
export { SingleUser };
