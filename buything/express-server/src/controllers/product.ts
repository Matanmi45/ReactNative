import { RequestHandler } from "express";
import path from "path";
import fs from "fs";

export const getProduct: RequestHandler = (req, res) => {
  const productDataPath = path.join(__dirname, "../data/product-details.json");
  const result = fs.readFileSync(productDataPath, { encoding: "utf-8" });

  if (result) {
    const products = JSON.parse(result) as { id: number }[];
    const product = products.find(
      (item) => item.id.toString() === req.params.id
    );
    if (product) res.json({ product });
    else res.json({ product: null });
  } else {
    res.json({ product: null });
  }
};

export const getCategories: RequestHandler = (req, res) => {
  const categoriesPath = path.join(__dirname, "../data/categories.json");
  const result = fs.readFileSync(categoriesPath, { encoding: "utf-8" });
  let categories: string[] = [];
  if (result) {
    categories = JSON.parse(result);
  }

  res.json({ categories });
};

type Product = {
  title: string;
  description: string;
  category: string;
  poster: string;
  price: {
    mrp: number;
    sale: number;
  };
};

export const getProducts: RequestHandler = (req, res) => {
  const usersDataPath = path.join(__dirname, "../data/products.json");
  const result = fs.readFileSync(usersDataPath, { encoding: "utf-8" });
  let products: Product[] = [];
  if (result) {
    products = JSON.parse(result);
  }

  res.json({ products });
};

export const getProductsByCategory: RequestHandler = (req, res) => {
  const usersDataPath = path.join(__dirname, "../data/products.json");
  const result = fs.readFileSync(usersDataPath, { encoding: "utf-8" });
  let products: Product[] = [];
  if (result) {
    products = JSON.parse(result);
  }

  res.json({
    products: products.filter(
      ({ category }) => category === req.params.category
    ),
  });
};
