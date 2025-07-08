import { Response, Request } from "express";
import { prisma } from "../database";
import bcrypt from "bcryptjs";

export default {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      // Validação dos campos
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
          error: true,
          message: "Todos os campos são obrigatórios",
        });
      }

      // Verifica se as senhas coincidem
      if (password !== confirmPassword) {
        return res.status(400).json({
          error: true,
          message: "As senhas não coincidem",
        });
      }

      // Verifica se o usuário já existe
      const userExist = await prisma.user.findUnique({ where: { email } });
      if (userExist) {
        return res.status(409).json({
          error: true,
          message: "Erro: usuário já existe",
        });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o usuário
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          // Não retorna a senha na resposta
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(201).json({
        error: false,
        message: "Usuário registrado com sucesso",
        user: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Erro interno no servidor",
      });
    }
  },
};
