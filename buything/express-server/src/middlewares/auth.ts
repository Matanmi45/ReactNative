import { getUserByEmail } from "@/controllers/auth";
import { ip, port } from "@/utils/helper";
import { RequestHandler } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        image?: string;
      };
    }
  }
}

export const isAuth: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(403).json({ error: "Unauthorized request!" });
    return;
  }

  const token = authorization.split("Bearer ")[1];
  if (!token) {
    res.status(403).json({ error: "Unauthorized request!" });
    return;
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    email: string;
  };
  if (!payload) {
    res.status(403).json({ error: "Unauthorized request!" });
    return;
  }

  const foundUser = getUserByEmail(payload.email);
  if (!foundUser) {
    res.status(403).json({ error: "Unauthorized request!" });
    return;
  }

  const user: typeof req.user = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
  };

  const imagePath = path.join(__dirname, "../images", `/${foundUser.id}.png`);

  if (fs.existsSync(imagePath))
    user.image = `http://${ip}:${port}/images/${user.id}.png`;
  req.user = user;

  next();
};
