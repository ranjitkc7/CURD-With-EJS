const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  try {
    const users = await userModel.find(); 
    res.render("read", { users }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

app.post("/create", async (req, res) => {
  try {
    let { name, email, imageUrl } = req.body;
    let userCreate = await userModel.create({
      name,
      email,
      imageUrl,
    });
    res.redirect("/read");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});
app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findByIdAndDelete(req.params.id);
  res.redirect("/read");  
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
