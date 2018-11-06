/* global require */
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//permissions
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
  
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
    {id: 4, name: "course4"}
];

app.get("/", (req, res) => res.send("Hello World!"));


app.listen(port, () => console.log(`Example app listening on port ${port}!`));