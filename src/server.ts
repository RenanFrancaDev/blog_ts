import express, { Request, Response } from "express";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/createUser", UserController.createUser);
app.post("/createPost", PostController.createPost);

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});
