import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <div>Home</div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </>
    );
}

export default HomePage