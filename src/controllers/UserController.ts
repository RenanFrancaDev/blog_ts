import { Response, Request } from "express";
import { prisma } from "../database";

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      const userExist = await prisma.user.findUnique({ where: { email } });
      if (userExist) {
        return res.json({
          error: true,
          message: "Error: user already exist",
        });
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      return res.json({
        error: false,
        message: "Erro: registered user",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
