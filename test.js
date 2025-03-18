require('dotenv').config();

const dbPassword = process.env.DB_PASSWORD;
const apiToken = process.env.API_TOKEN;

console.log("DB-Passwort:", dbPassword);