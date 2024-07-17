import express from "express";
import { VALUE } from "@repo/common/config"
const app = express();

console.log("Value: ", VALUE);
app.get("/", (req, res) => {
    res.json({ message: "Healthy server", "value": VALUE });
})

app.listen(3003)

