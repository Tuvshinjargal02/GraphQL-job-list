import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../graphql/query";

export default function CreateJobPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const job = await createJob(title, description);
        navigate(`/jobs/${job.id}`);
        console.log(job);
    };

    return (
        <div>
            <h1 className="title">Шинээр зар нэмэх</h1>
            <div className="box">
                <form>

                    <div className="field">
                        <div className="label">Зарын гарчиг</div>
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
                        <div className="label">Зарын дэлгэрэнгүй</div>
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
                            <button onClick={handleSubmit} className="button is-link">Оруулах</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};