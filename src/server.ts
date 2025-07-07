import express, { Request, Response } from "express";
import UserController from "./controllers/UserController";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/createUser", UserController.createUser);

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});
