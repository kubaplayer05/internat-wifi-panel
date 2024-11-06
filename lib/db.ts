import mariadb from "mariadb"

export const dbPool = mariadb.createPool({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
})