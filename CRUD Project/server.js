const express = require("express");
const dotenv = require("dotenv").config()
const contact = require("../CRUD Project/routes/contact");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const user = require("../CRUD Project/routes/user")


const app = express();
const port = process.env.PORT || 5000;
connectDb()
app.use(express.json());
app.use("/api/contacts", contact);
app.use("/api/users", user);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server runninng on port ${port}`);
})