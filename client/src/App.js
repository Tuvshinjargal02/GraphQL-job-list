import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/home-page";
import JobPage from "./pages/job-page";
import CompanyPage from "./pages/company-page";
import LoginPage from "./pages/login-page";
import NavBar from "./components/navbar";
import CreateJobPage from "./pages/create-job-page";
import EditjobPage from "./pages/edit-job-page";


function App() {

  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <>
    <NavBar loggedUser={loggedUser} setLoggedUser={setLoggedUser}/>
    <main className="section">
      <Routes>
        <Route index path="/" element={ <HomePage /> } />
        <Route path="/jobs/:jobId" element={ <JobPage loggedUser={loggedUser}/> } />
        <Route path="/company/:companyId" element={ <CompanyPage /> } />
        <Route path="/login" element={ <LoginPage setLoggedUser={setLoggedUser}/> } />
        <Route path="/jobs/new" element={ <CreateJobPage /> } />
        <Route path="/jobs/edit/:jobId" element={ <EditjobPage loggedUser={loggedUser}/> } />
      </Routes>
    </main>
    </>
  );
}

export default App;
