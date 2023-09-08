import { Request, Response } from "express";
import { CategoriesService } from "../../services/categoriesService";
import { validateParams } from "../../utils/validateParams";
import { DbResult } from "../../utils/errors";
import { TablesInsertProps } from "../../config/database.types";
import {
  CategoriesDeleteParams,
  CategoriesListParams,
  CategoriesUpdateParams,
} from "./categoriesController.types";

export const CategoriesController = {
  async list(req: Request<CategoriesListParams>, res: Response) {
    const params = validateParams<CategoriesListParams>(req.params, [
      "walletId",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }
    try {
      const query = CategoriesService.list(params?.data?.walletId || "");
      const { data, status, statusText }: DbResult<typeof query> = await query;
      return res.status(status).json({
        data,
        statusText,
      });
    } catch (error: any) {
      const message = error?.message || "Something broke!";
      return res.status(500).json({
        errors: [message],
        ...error,
      });
    }
  },
  async create(
    req: Request<any, TablesInsertProps<"Categories">>,
    res: Response
  ) {
    const params = validateParams<TablesInsertProps<"Categories">>(req.body, [
      "wallet_id",
      "name",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = CategoriesService.create(params.data);
      const { data, status, statusText }: DbResult<typeof query> = await query;
      return res.status(status).json({
        data,
        statusText,
      });
    } catch (error: any) {
      const message = error?.message || "Something broke!";
      return res.status(500).json({
        errors: [message],
        ...error,
      });
    }
  },
  async delete(req: Request<CategoriesDeleteParams>, res: Response) {
    const params = validateParams<CategoriesDeleteParams>(req.params, [
      "categoryId",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }
    try {
      const query = CategoriesService.delete(params.data.categoryId || "");
      const { data, status, statusText }: DbResult<typeof query> = await query;
      return res.status(status).json({
        data,
        statusText,
      });
    } catch (error: any) {
      const message = error?.message || "Something broke!";
      return res.status(500).json({
        errors: [message],
        ...error,
      });
    }
  },
  async update(
    req: Request<CategoriesUpdateParams, TablesInsertProps<"Categories">>,
    res: Response
  ) {
    const params = validateParams<CategoriesUpdateParams>(
      { ...req.params, ...req.body },
      ["name", "categoryId"]
    );
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = CategoriesService.update({
        id: params.data.categoryId,
        name: params.data.name || "",
      });
      const { data, status, statusText }: DbResult<typeof query> = await query;
      return res.status(status).json({
        data,
        statusText,
      });
    } catch (error: any) {
      const message = error?.message || "Something broke!";
      return res.status(500).json({
        errors: [message],
        ...error,
      });
    }
  },
};
