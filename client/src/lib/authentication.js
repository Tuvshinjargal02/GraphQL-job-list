import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:9000";

export async function login(email, password){

    const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    });

    if(!response.ok){
        return null;
    };

    const { token } = await response.json();

    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    localStorage.setItem("job_app_token", token);

    const data = jwtDecode(token)


    return {
        id: data.sub,
        email: data.email,
        companyId: data.companyId
    };
};