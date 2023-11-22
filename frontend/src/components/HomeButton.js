import { useNavigate } from "react-router-dom";

/**
 * Home button JSX element.
 * @returns JSX button elements for home buton
 */
function HomeButton() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };

    return <button onClick={handleClick}>Home Button</button>;
}

export { HomeButton };