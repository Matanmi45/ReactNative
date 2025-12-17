import { SignInHandler, SignUpHandler } from "@/types";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { ip, port } from "@/utils/helper";

type User = { id: string; name: string; email: string; password: string };

export const getUserByEmail = (email: string) => {
  const usersDataPath = path.join(__dirname, "../data/users.json");
  const result = fs.readFileSync(usersDataPath, { encoding: "utf-8" });
  if (result) {
    const data = JSON.parse(result) as User[];
    const foundUser = data.find((item) => item.email === email);
    if (foundUser) return foundUser;
  }

  return null;
};

export const registerNewUser: SignUpHandler = (req, res) => {
  const { name, email, password } = req.body;

  const dataDir = path.join(__dirname, "../data");

  // creating new data folder if not exists
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

  // file path to store user information
  const usersDataPath = path.join(dataDir, "/users.json");

  // creating and adding new user data if users.json file is not exists
  if (!fs.existsSync(usersDataPath))
    fs.writeFileSync(
      usersDataPath,
      JSON.stringify([{ name, email, password }]),
      { encoding: "utf-8" }
    );
  else {
    const result = fs.readFileSync(usersDataPath, { encoding: "utf-8" });
    if (result) {
      const data = JSON.parse(result) as User[];
      const foundUser = getUserByEmail(email);

      if (foundUser) {
        res.status(403).json({ error: "Email is already exists!" });
        return;
      }

      data.push({ id: `${new Date().getTime()}`, name, email, password });

      fs.writeFileSync(usersDataPath, JSON.stringify(data), {
        encoding: "utf-8",
      });
    } else {
      res
        .status(500)
        .json({ error: "Something went wrong, please try again later!" });
      return;
    }
  }

  res.json();
};

export const signInUsers: SignInHandler = (req, res) => {
  const { email, password } = req.body;

  const usersDataPath = path.join(__dirname, "../data/users.json");

  if (!fs.existsSync(usersDataPath)) {
    res.status(500).json({ error: "Something went wrong, sign in failed!" });
    return;
  }

  const foundUser = getUserByEmail(email);
  if (!foundUser || foundUser.password !== password) {
    res.status(403).json({ error: "Email/Password mismatch!" });
    return;
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET!);
  res.json({ profile: { name: foundUser.name, email }, token });
};

export const sendProfileInfo: RequestHandler = (req, res) => {
  res.json({ profile: req.user });
};

export const updateProfileImage: RequestHandler = async (req, res) => {
  const file = req.files?.image;

  // if file is invalid
  if (Array.isArray(file) || !file?.mimetype?.startsWith("image/")) {
    res.status(422).json({ error: "Invalid image type!" });
    return;
  }

  // upload file to the directory
  const imageDir = path.join(__dirname, "../images");
  // creating new images folder if not exists
  if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);
  const imagePath = path.join(imageDir, `/${req.user.id}.png`);

  await file.mv(imagePath);

  res.json({
    result: {
      ...req.user,
      image: `http://${ip}:${port}/images/${req.user.id}.png`,
    },
  });
};
