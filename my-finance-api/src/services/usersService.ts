import { db } from "../config/database";
import { TablesInsertProps } from "../config/database.types";

const usersDb = db.from("User");

interface SignUpProps extends TablesInsertProps<"User"> {
  email: string;
  password: string;
}

export const UsersService = {
  create(props: TablesInsertProps<"User">) {
    return usersDb.insert([props]).select();
  },
  show(userId: string) {
    return usersDb.select().eq("id", userId);
  },
  delete(userId: string) {
    return usersDb.delete().eq("id", userId);
  },
  signUp(props: SignUpProps) {
    return db.auth.signUp({
      email: props.email,
      password: props.password,
    });
  },
};
