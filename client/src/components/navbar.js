import { Link, useNavigate } from "react-router-dom";

export default function NavBar({loggedUser, setLoggedUser}) {

    const isLogged = Boolean(loggedUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedUser(null);
        localStorage.removeItem("job_app_token");
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-start">
                <Link className="navbar-item" to="/">Зарууд</Link>
            </div>

            <div className="navbar-end">

            {isLogged ? (
                <>
                <span className="navbar-item has-text-gray">{loggedUser.email}</span>
                <Link className="navbar-item" to="/jobs/new">Зар нэмэх</Link>
                <a className="navbar-item" onClick={handleLogout}>Гарах</a>
                </>
            ) : (
                <>
                <Link className="navbar-item" to="/login">Нэвтрэх</Link>
                </>
            )}

            </div>

        </nav>
    );
};