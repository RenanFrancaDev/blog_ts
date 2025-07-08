import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extrai o token do header/cookie
    const token = req.headers.authorization?.split(" ")[1];
    console.log("TOKEN", token);

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    // 2. Verifica a assinatura do token (stateless)
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    // 3. (Opcional) Verifica se o usuário ainda existe no banco
    const userExists = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true }, // Apenas verifica a existência
    });

    if (!userExists) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // 4. Adiciona o userId à requisição
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
