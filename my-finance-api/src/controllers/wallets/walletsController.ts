import { Request, Response } from "express";
import { WalletsService } from "../../services/walletsService";
import { validateParams } from "../../utils/validateParams";
import { DbResult } from "../../utils/errors";
import {
  WalletCreateBody,
  WalletDeleteParams,
  WalletListParams,
  WalletUpdateBody,
} from "./walletsController.types";

export const WalletsController = {
  async create(req: Request, res: Response) {
    const typedBody = req.body as WalletCreateBody;
    const params = validateParams<WalletCreateBody>(typedBody, [
      "userId",
      "name",
      "description",
    ]);

    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const { userId, name, description } = params.data;

      const query = WalletsService.create({
        user_id: userId,
        name,
        description,
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
  async list(req: Request, res: Response) {
    const typedParams = req.params as unknown as WalletListParams;
    const params = validateParams<WalletListParams>(typedParams, ["userId"]);

    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = WalletsService.list(params.data.userId);

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
  async delete(req: Request, res: Response) {
    const typedParams = req.params as unknown as WalletDeleteParams;

    const params = validateParams<WalletDeleteParams>(typedParams, [
      "walletId",
    ]);

    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = WalletsService.delete(params.data.walletId);

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
    const typedBody = req.body as WalletUpdateBody;

    const params = validateParams<WalletUpdateBody>(typedBody, [
      "name",
      "description",
      "walletId",
    ]);

    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = WalletsService.update({
        ...params.data,
        id: params.data.walletId,
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
