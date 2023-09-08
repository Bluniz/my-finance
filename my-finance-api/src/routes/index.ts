import express from "express";
import { errorMidleware } from "../middlewares/errorMidleware";
import { authMidleware } from "../middlewares/authMidleware";

import { WalletsController } from "../controllers/wallets/walletsController";
import { TransactionsController } from "../controllers/transactions/transactionsController";
import { CategoriesController } from "../controllers/categories/categoriesController";
import { UsersController } from "../controllers/users/usersController";

export const router = express.Router();

router.use(errorMidleware);

router.get("/wallets/:userId", authMidleware, WalletsController.list);
router.post("/wallets/create", authMidleware, WalletsController.create);
router.delete("/wallets/:walletId", authMidleware, WalletsController.delete);
router.patch("/wallets/update", authMidleware, WalletsController.update);

//! Falta Midleware
//! Ajustar rotas para funcionar com o auth

router.get(
  "/transactions/:walletId",
  authMidleware,
  TransactionsController.list
);
router.post(
  "/transactions/create",
  authMidleware,
  TransactionsController.create
);
router.delete(
  "/transactions/:transactionId",
  authMidleware,
  TransactionsController.delete
);
router.patch(
  "/transactions/:transactionId",
  authMidleware,
  TransactionsController.update
);

router.get("/categories/:walletId", authMidleware, CategoriesController.list);
router.post("/categories/create", authMidleware, CategoriesController.create);
router.delete(
  "/categories/:categoryId",
  authMidleware,
  CategoriesController.delete
);
router.patch(
  "/categories/:categoryId",
  authMidleware,
  CategoriesController.update
);

router.post("/users/create", UsersController.create);
router.get("/users/:userId", authMidleware, UsersController.show);
