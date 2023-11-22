import { Main } from "../components/Main";
import { useSearchParams, useLocation } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import ErrorBoundary from "components/ErrorBoundary";
import { SystemError } from "./SystemError";
import { LoggedInContext } from "../components/App";
import { useContext } from "react";
import { LoginForm } from "components/LoginForm";
/**
 * Get Home page JSX components.
 * @returns JSX elements to render for home page.
 */
function Home() {
   
    const { state } = useLocation();
    const [isLoggedIn] = useContext(LoggedInContext);


    return (
        <ErrorBoundary fallback={<SystemError errorMessage="Something went wrong." />}>
            {state && state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}
            <h1> Welcome to your SecurePass Password Manager!</h1>
            {isLoggedIn ? <Main /> : <LoginForm/>}
            
            
        </ErrorBoundary>
    );
}

export { Home };