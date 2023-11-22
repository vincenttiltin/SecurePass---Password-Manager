import { useState } from "react";
import { DeleteUserForm } from "./DeleteUserForm";
import { useEffect } from "react";
import { Card } from "./Card";

/**
 * Get JSX elements for displaying a deleted user.
 * @param {*} setDisplay Function that sets what to display within a component
 * @returns JSX of containing deleted user within a Card Component to render
 */
function DeleteUser({ setDisplay }) {
    const [deleted, setDeleted] = useState(null);

    useEffect(() => {
        if (deleted) { // Only update display when a user has been deleted
                setDisplay(
                        <Card>
                            <h1>The deleted user is</h1>
                            <h2>Username: {deleted.username}</h2>
                        </Card>
                );
        }
    }, [deleted, setDisplay]);


    return (
        <>
            <DeleteUserForm setDeleted={setDeleted} />
        </>
    );
}

export { DeleteUser };