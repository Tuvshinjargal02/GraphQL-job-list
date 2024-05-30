import knex from "../lib/db.js";

export async function getCompanyById(id) {
    return await knex.table("company").first().where({id});
};