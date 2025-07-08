import { Response, Request } from "express";
import { prisma } from "../database";

export default {
  async createPost(req: Request, res: Response) {
    try {
      const { title, content, userId } = req.body;

      // Validação básica
      if (!title || !content || !userId) {
        return res.status(400).json({
          error: true,
          message: "Title, content and userId are required",
        });
      }

      // Verifica se o usuário existe ANTES de criar o post
      const userExists = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });

      if (!userExists) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId: Number(userId),
        },
      });

      return res.status(201).json(post); // Retorna apenas o post criado
    } catch (error) {
      console.error("Post creation error:", error);
      return res.status(500).json({
        error: true,
        message: "Internal server error",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
};
