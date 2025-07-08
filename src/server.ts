import express, { Request, Response } from "express";
import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";
import { authMiddleware } from "./auth/middleware";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.post("/createUser", UserController.createUser);
app.post("/login", UserController.login);
app.post("/createPost", authMiddleware, PostController.createPost);
app.post("/post", authMiddleware, PostController.createPost);

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});
