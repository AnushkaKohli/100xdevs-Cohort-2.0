import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "hellohello";

const app = express();
app.use(express.json());
// Cookie parser parses the cookie string into individual coookie objects as cookies are stores as a long string separated by semicolons
app.use(cookieParser());
app.use(
  cors({
    // credentials true for cross site requests
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // do db validation and fetch user from db
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET
  );
  // will put the cookie in set cookie header
  res.cookie("token", token);
  res.send("Logged in!");
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  // if we were not using cookieParser, we would have to do req/headers("Cookie") and then cotinue
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  // Get email of the user from db
  res.send({
    userId: decoded.id,
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "");
  // res.clearCookie("token")
  res.json({
    message: "Logged out!",
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(3000, () => {
  console.log("Listening to backend at port 3000");
});
