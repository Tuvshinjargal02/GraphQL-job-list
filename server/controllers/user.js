import knex from "../lib/db.js";

export async function getUserByEmail(email){
   return await knex.table("user").first().where({email});
};