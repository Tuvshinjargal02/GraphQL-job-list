import knex from "./db.js";

const { schema } = knex;

await schema.dropTableIfExists("user");
await schema.dropTableIfExists("job");
await schema.dropTableIfExists("company");

await schema.createTable("company", (table) => {
  table.text("id").notNullable().primary();
  table.text("name").notNullable();
  table.text("description");
});

await schema.createTable("job", (table) => {
  table.text("id").notNullable().primary();
  table.text("companyId").notNullable().references("id").inTable("company");
  table.text("title").notNullable();
  table.text("description");
  table.text("createdAt").notNullable();
});

await schema.createTable("user", (table) => {
  table.text("id").notNullable().primary();
  table.text("companyId").notNullable().references("id").inTable("company");
  table.text("email").notNullable().unique();
  table.text("password").notNullable();
});

await knex.table("company").insert([
  {
    id: "FjcJCHJALA4i",
    name: "Tesla",
    description:
      "Дэлхийг улам ногоон болгохын төлөө бид цахилгаан автомашиныг дэлхийд нэвтрүүлнэ.",
  },
  {
    id: "Gu7QW9LcnF5d",
    name: "Amazon",
    description:
      "Амазон компани нь дэлхийн хэмжээнд өөрийн глобаль сүлжээг нэвтрүүлж, олон улсын компаниудад мэргэжлийн сэрвэр infrastructure болон 400+ онлайн сэрвисүүдээр үйлчилгээ үзүүлдэг.",
  },
]);

await knex.table("job").insert([
  {
    id: "f3YzmnBZpK0o",
    companyId: "FjcJCHJALA4i",
    title: "Frontend хөгжүүлэгч",
    description:
      "Бид React төсөл дээр туршлагатай Frontend хөгжүүлэгч ажилд авна.",
    createdAt: "2023-07-11T11:18:00.000Z",
  },
  {
    id: "XYZNJMXFax6n",
    companyId: "FjcJCHJALA4i",
    title: "Backend хөгжүүлэгч",
    description:
      "Бид Node.js болон Express дээр туршлагатай Backend хөгжүүлэгч хайж байна.",
    createdAt: "2023-07-12T10:25:00.000Z",
  },
  {
    id: "6mA05AZxvS1R",
    companyId: "Gu7QW9LcnF5d",
    title: "GraphQL хөгжүүлэгч",
    description:
      "Rest api Backend-ийг GraphQL рүү шилжүүлэх туршлагатай хөгжүүлэгч хайж байна.",
    createdAt: "2023-07-14T11:30:00.000Z",
  },
]);

await knex.table("user").insert([
  {
    id: "AcMJpL7b413Z",
    companyId: "FjcJCHJALA4i",
    email: "mask@tesla.com",
    password: "123",
  },
  {
    id: "BvBNW636Z89L",
    companyId: "Gu7QW9LcnF5d",
    email: "bezos@amazon.com",
    password: "123",
  },
]);

process.exit();
