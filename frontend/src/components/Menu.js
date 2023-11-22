import Button from "@mui/material/Button";
import { AddUser } from "./AddUser";
import { SingleUser } from "./SingleUser";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";
import { ListUsers } from "./ListUsers";

/**
 * Get menu to display for accessing different components.
 * @param {*} setDisplay Function that sets what to display within a component.
 * @returns JSX menu buttons that controls what components are displayed in right pane.
 */
function Menu({ setDisplay }) {
    const menuItem1 = <AddUser setDisplay={setDisplay} />;
    const menuItem2 = <SingleUser setDisplay={setDisplay} />;
    const menuItem4 = <UpdateUser setDisplay={setDisplay} />;
    const menuItem5 = <DeleteUser setDisplay={setDisplay} />;

    const  callGetAllUsers = async() =>{
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
          };
        const response = await fetch("http://localhost:1339/users", requestOptions);
        const result = await response.json();
        
        setDisplay(<ListUsers users={result}  heading="The found users are" />);
    };


    return (
        <div className="d-flex justify-content-center flex-column">
            <Button color="success" variant="contained" onClick={() => setDisplay(menuItem1)}>
                Add Password
            </Button>
            <p />
            <Button color="success" variant="contained" onClick={() => setDisplay(menuItem2)}>
                Get Single Password
            </Button>
            <p />
            <Button color="success" variant="contained" onClick={callGetAllUsers}>
                Show All Password
            </Button>
            <p />
            <Button color="success" variant="contained" onClick={() => setDisplay(menuItem4)}>
                Update Password
            </Button>
            <p />
            <Button color="success" variant="contained" onClick={() => setDisplay(menuItem5)}>
                Delete Password
            </Button>
        </div>
    );
}

export default Menu;