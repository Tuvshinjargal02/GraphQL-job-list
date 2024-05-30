import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../graphql/query";
import JobList from "../components/job-list";


export default function CompanyPage() {

    const [state, setState] = useState({
        loading: true,
        error: false,
        errorMessage: null,
        company: null,
    });

    const { companyId } = useParams();

    useEffect( () => {
        getCompanyById(companyId).then((data) => {
            setState({
                loading: false,
                error: false,
                errorMessage: null,
                company: data,
            })
        }).catch((err) => {
            console.log(err)
            setState({
                loading: false,
                error: true,
                errorMessage: err.response.errors[0].message,
                company: null,
            })
        });
    }, [companyId]) ;

    const {loading, error, company, errorMessage} = state;

    if(loading) return <div>Ачаалж байна. Та түр хүлээнэ үү.</div>

    if(error) return (
        <div className=" box has-text-danger">
            {errorMessage} Та дахин оролдоно уу.
        </div>
    );

    return  (
        <div>
            <h1 className="title">{company.name}</h1>
            <div className="box">{company.description}</div>
            <h2 className="title is-5">Бидний санал болгож буй ажлын байрууд</h2>
            <JobList jobs={company.jobs} />
        </div>
    );
};