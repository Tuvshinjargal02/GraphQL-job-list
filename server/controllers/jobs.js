import { customAlphabet } from "nanoid";
import knex from "../lib/db.js";

export async function getJobs() {
    return await knex.table("job").select();
};

export async function getJobsByCompanyId(companyId) {
    return await knex.table("job").select().where({ companyId });
};

const chars = "0123456789ABCDEFGHIJKLMNOFQRSTUVWZYZabcdefghijqlmnofqrstuvwzyz";

export async function createJob(companyId, title, description){
    const newJob = {
        id: customAlphabet(chars, 12)(),
        companyId,
        title,
        description,
        createdAt: new Date().toISOString(),
    };

    await knex.table("job").insert(newJob);
    return newJob;
};

export async function deleteJob(id, companyId){
    const job = await knex.table("job").first().where({ id , companyId});
    if(!job){
        throw Error(`${id} ID - тай ажлын зар олдсонгүй.`);
    };
    await knex.table("job").delete().where({ id });
    return job;
};

export async function updateJob({id, title, description, companyId}){
    const job = await knex.table("job").first().where({ id, companyId });
    if(!job){
        throw Error(`${id} ID - тай ажлын зар олдсонгүй.`);
    };
    const updateFields = { title, description };
    await knex.table("job").update(updateFields).where({ id });
    return { ...job, ...updateFields};
};