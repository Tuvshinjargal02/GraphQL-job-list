import knex from "../lib/db.js";

export async function getJobById(id) {
    return await knex.table("job").first().where({id});
};