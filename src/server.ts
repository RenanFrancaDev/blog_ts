import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});
