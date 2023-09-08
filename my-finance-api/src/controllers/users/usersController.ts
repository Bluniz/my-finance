import { Request, Response } from "express";
import { UsersService } from "./../../services/usersService";
import { validateParams } from "../../utils/validateParams";
import { DbResult } from "../../utils/errors";
import { UsersControllerBody, UsersShowParams } from "./usersController.types";

export const UsersController = {
  async create(req: Request<undefined, UsersControllerBody>, res: Response) {
    const params = validateParams<UsersControllerBody>(req.body, [
      "email",
      "password",
      "name",
    ]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }
    try {
      const { data: authData, error } = await UsersService.signUp(params.data);

      if (error) throw error;
      const { name, photoUrl, email } = params.data;
      const query = UsersService.create({
        id: authData?.user?.id,
        name,
        email,
        photo_url: photoUrl,
      });
      const { data, status, statusText }: DbResult<typeof query> = await query;

      if (statusText === "Conflict")
        throw new Error("Already exists a user with the the same email!");

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
  async show(req: Request<UsersShowParams>, res: Response) {
    const params = validateParams<UsersShowParams>(req.params, ["userId"]);
    if (params.errors) {
      return res.status(400).json({ errors: params.errors });
    }

    try {
      const query = UsersService.show(params.data.userId || "");
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
