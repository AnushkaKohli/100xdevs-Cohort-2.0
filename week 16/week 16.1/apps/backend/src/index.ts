import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "Healthy server" });
})

app.listen(3003)