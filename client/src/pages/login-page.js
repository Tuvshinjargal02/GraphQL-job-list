import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../lib/authentication";

export default function LoginPage({setLoggedUser}) {

    const [email, setEmail] = useState("mask@tesla.com");
    const [password, setPassword] = useState("123");
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const user = await login(email, password);

        if(user){
            setLoggedUser(user);
            setError(false);
            navigate("/");
        } else {
            setError(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="field">
                    <div className="label">Имэйл</div>
                    <div className="control">
                        <input onChange={(event) => setEmail(event.target.value)}className="input" type="email" required value={email}/>
                    </div>
                </div>

                <div className="field">
                    <div className="label">Нууц үг</div>
                    <div className="control">
                        <input onChange={(event) => setPassword(event.target.value)}className="input "type="password" required value={password}/>
                    </div>
                </div>

                {error && (
                    <div className="message is-danger">
                        <div className="message-body">
                            Логин амжилтгүй боллоо !
                        </div>
                    </div>
                )}

                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-link">
                            Нэвтрэх
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
};