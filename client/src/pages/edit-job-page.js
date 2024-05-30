import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../graphql/query";

export default function EditjobPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { jobId } = useParams();

    useEffect( () => {
        getJobById(jobId).then((data) => {
            setTitle(data.title);
            setDescription(data.description);
        });
    }, [jobId])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedJob = await updateJob(jobId ,title, description);
        navigate(`/jobs/${jobId}`);
    };

    return (
        <div>
            <h1 className="title">Зарыг засварлах</h1>
            <div className="box">
                <form>

                    <div className="field">
                        <div className="label">өөрчлөх зарын гарчиг</div>
                        <div className="control">
                        <input
                            value={title} 
                            type="text" 
                            className="input" 
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        </div>
                    </div>

                    <div className="field">
                        <div className="label"> өөрчлөх зарын дэлгэрэнгүй</div>
                        <div className="control">
                            <textarea 
                                value={description} 
                                className="textarea" 
                                rows={5} 
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                            <button onClick={handleSubmit} className="button is-link">
                            Хадгадах
                            </button>
                            {" "}
                            <button onClick={() => navigate(`/jobs/${jobId}`)} className="button is-warning">
                            Буцах
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};