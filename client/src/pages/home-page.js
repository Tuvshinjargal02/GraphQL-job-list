import { useEffect, useState } from "react";
import { getJobs } from "../graphql/query";
import JobList from "../components/job-list"


export default function HomePage() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs().then((data) => setJobs(data));
    }, []);

    return <div>
        <h1 className="title">Ажлын зар</h1>
        <JobList jobs = {jobs}/>
    </div>
};