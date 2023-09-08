import { Request, Response } from "express";
import { TransactionsService } from "../../services/transactionsService";
import { validateParams } from "../../utils/validateParams";
import { DbResult } from "../../utils/errors";
import { TablesInsertProps } from "../../config/database.types";
import {
  TransactionsDeleteParams,
  TransactionsListParams,
} from "./transactionsController.types";

export const TransactionsController = {
  async create(
    req: Request<any, TablesInsertProps<"Transactions">>,
    res: Response
  ) {
    const params = validateParams(req.body, [
      "name",
      "amount",
      "walletId",
      "month",
      "year",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = TransactionsService.create({
        wallet_id: params.data.walletId,
        ...params.data,
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
  async list(req: Request<TransactionsListParams>, res: Response) {
    const params = validateParams<TransactionsListParams>(req.params, [
      "walletID",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }
    try {
      const query = TransactionsService.list(params.data.walletId || "");
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
  async delete(req: Request<TransactionsDeleteParams>, res: Response) {
    const params = validateParams<TransactionsDeleteParams>(req.params, [
      "transactionId",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }
    try {
      const query = TransactionsService.list(params.data.transactionId || "");
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
  async update(req: Request, res: Response) {
    const params = validateParams(req.body, [
      "name",
      "amount",
      "walletId",
      "month",
      "year",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = TransactionsService.update({
        wallet_id: params.data.walletId,
        ...params.data,
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
