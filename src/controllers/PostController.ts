import { Response, Request } from "express";
import { prisma } from "../database";

interface AuthRequest extends Request {
  userId?: number;
}

export default {
  async createPost(req: AuthRequest, res: Response) {
    try {
      const { title, content } = req.body;
      const userId = req.userId;

      // Validação básica
      if (!title || !content) {
        return res.status(400).json({
          error: true,
          message: "Title, content and userId are required",
        });
      }

      if (!userId) {
        return res.status(401).json({
          error: true,
          message: "User not found",
        });
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId,
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
