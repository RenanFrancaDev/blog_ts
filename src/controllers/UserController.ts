import { Response, Request } from "express";
import { prisma } from "../database";
import bcrypt from "bcryptjs";
import { generateToken } from "../auth/jwt";

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

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = generateToken(user.id);

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
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
