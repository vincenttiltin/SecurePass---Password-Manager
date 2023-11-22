import { NavButton } from "./NavButton";
import { LoggedInContext } from "./App";
import {useContext} from "react";
import {LogoutButton} from "./LogoutButton";

/**
 * JSX header elements.
 * @returns JSX elements containing header information to render
 */
function Header() {
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);

    return (
        <div>
            <div>
                <NavButton to="/" label="Home" />
                {isLoggedIn && <NavButton to="/profile/new" label="Create Profile"/>}
                {isLoggedIn && <NavButton to="/profile" label="Profile"/>}
                <NavButton to="/facts" label="Password Facts" />
                <NavButton to="/about" label="About Us" />
                <NavButton to="/contact" label="Contact" />
                
                {!isLoggedIn && <NavButton to="/signUp" label = "Sign Up"/>}
            </div>

            {isLoggedIn && <LogoutButton/>}
        </div>
    );
}

export { Header };