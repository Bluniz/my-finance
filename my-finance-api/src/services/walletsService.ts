import { db } from "../config/database";
import { TablesInsertProps } from "../config/database.types";

const walletsTable = db.from("Wallet");

export const WalletsService = {
  list(userId: string) {
    return walletsTable.select().eq("user_id", userId);
  },
  create(props: TablesInsertProps<"Wallet">) {
    return walletsTable.insert([props]).select();
  },
  delete(walletId: string) {
    return walletsTable.delete().eq("id", walletId);
  },
  update(
    props: Pick<TablesInsertProps<"Wallet">, "name" | "description" | "id">
  ) {
    return walletsTable.update(props).eq("id", props.id);
  },
};
