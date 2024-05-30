import knex from "knex";

export default knex({
    client: "better-sqlite3",
    connection: {
        filename: "./data/mydb.sqlite",
    },
});