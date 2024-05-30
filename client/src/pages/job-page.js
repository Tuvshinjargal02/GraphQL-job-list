import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById, deleteJob } from "../graphql/query";


export default function JobPage({loggedUser}) {

    const [state, setState] = useState({
        loading: true,
        errorMessage: null,
        error: false,
        job: null,
    });
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const modalClass = showModal ? "is-active" : "";

    const { jobId } = useParams();
    
    useEffect(() => {
        getJobById(jobId).then((data) => {
            setState({
                loading: false,
                errorMessage: null,
                error: false,
                job: data,
            });
        }).catch((err) => {
            setState({
                loading: false,
                errorMessage: err.response.errors[0].message,
                error: true,
                job: null,
            });
        });
    }, [jobId], );

    const {loading, errorMessage, error, job} = state;

    if(loading) return <div>УУЧЛААРАЙ ачаалж байна тул. Та түр хүлээнэ үү.</div>;

    if(error) return (
        <div className="box has-text-danger">
            {errorMessage} Та дахин оролдоно уу.
        </div>
    );

    function triggerModal() {
        setShowModal(!showModal);
    };
    async function handleDelete() {
       const deletedJob = await deleteJob(jobId);
       navigate("/");
    };

    return (
        <div>
            <div className={`modal ${modalClass}`}>
            <div className="modal-background" />
            <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">Та энэ зарыг устгахдаа итгэлтэй байна уу ?</p>
            <button className="delete" aria-label="close" onClick={triggerModal}/>
            </header>
            <section className="modal-card-body">
            <div className="box">
                <div className="block has-text-grey">
                   Нийтэлсэн - {job.date}
                </div>
                <div className="block">
                    {job.description}
                </div>
            </div>
            </section>
            <footer className="modal-card-foot">
            <div className="buttons">
                <button className="button is-danger" onClick={handleDelete}>Зарыг устга</button>
                <button className="button" onClick={triggerModal}>Болих</button>
            </div>
            </footer>
        </div>
        </div>

            <h1 className="title is-3">{job.title}</h1>
            <h2 className="subtitle is-5">
                <Link to={`/company/${job.company.id}`}>{job.company.name}</Link>
            </h2>
            <div className="box">
                <div className="block has-text-grey">
                   Нийтэлсэн - {job.date}
                </div>
                <div className="block">
                    {job.description}
                </div>
            </div>
            {loggedUser && job.company.id === loggedUser.companyId && (
                <>
                <button className="button is-light is-danger" onClick={triggerModal}>
                    Устга
                </button>
                {" "}
                <button className="button is-light is-link" 
                        onClick={() => navigate(`/jobs/edit/${jobId}`)}>
                    Засварлах
                </button>
                </>
            )}
        </div>
    );
};