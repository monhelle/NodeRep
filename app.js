const express = require("express"); //importert express server

const app = express(); //vi lager en app

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    // res.send("<h1>I need coffee</h1><p>lorem ipsum</p>")
    res.render("index");
})

app.listen(4000, () => {
    console.log("http://localhost:4000")
}); //vi kjører appen på port 4000