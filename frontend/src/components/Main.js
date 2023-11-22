import { useState } from "react";
import TwoPanes from "./TwoPanes";
import Menu from "./Menu";

/**
 * Get menu and components with CRUD functionalities.
 * @returns TwoPanes JSX element containing menu and components within application
 */
function Main() {

    const defaultRightPane = <p>Manage Your SecurePass User Accounts</p>;
    const [rightPane, setRightPane] = useState(defaultRightPane);

    const defaultLeftPane = <Menu setDisplay={setRightPane} />;

    const [leftPane, setLeftPane] = useState(defaultLeftPane);

    return (
        <div>
            <TwoPanes leftPane={leftPane} rightPane={rightPane} />
        </div>
    );
}

export { Main };