const express = require("express"); //importert express server
const argon2 = require("argon2");
const mongoose = require("mongoose");

const mongodb = mongoose.connect("mongodb://localhost:27017/coffee");

//databasemodeller
const User = require("./models/User")




const app = express(); //vi lager en app

app.set("view engine", "ejs"); //bruker embedded javascript som view engine
app.use(express.urlencoded({ extended: true })); //trengs for å sende info i req.body fra frontend
app.use(express.static("public"));

app.get("/", (req, res) => {
  // res.send("<h1>I need coffee</h1><p>lorem ipsum</p>")
  res.render("index"); //trenger ikke filtype
});

app.get("/americano", (req, res) => {
  res.render("americano");
});

app.get("/latte", (req, res) => {
  res.render("latte");
});

app.get("/cappuchino", (req, res) => {
  res.render("cappuchino");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/registrer", (req, res) => {
  res.render("registrer");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const { kaffe, antall, size } = req.body;
  res.send(`Takk for at du valgte ${antall} ${size} ${kaffe}`);
});

app.post("/login", (req, res) => {
  const { email, passord } = req.body;
  res.send(`Din epost og passord er ${email} ${passord}`);
});

app.post("/registrer", async (req, res) => {
  //async
  const { email, passord, gjentaPassord } = req.body;

  if (passord !== gjentaPassord) {
    res.send("passord og gjenta passord stemmer ikke overens");
  } else {
    // hashe passordet her
    const hash = await argon2.hash(passord); //await

    const user = User.insertOne({
        email, 
        passord: hash
    })

    console.log(user);



    console.log(hash);

    res.redirect("/login");
  }

  // res.send(`Din epost og passord er ${email} ${passord} ${gjentaPassord}`)
});

app.listen(4000, () => {
  console.log("http://localhost:4000");
}); //vi kjører appen på port 4000
