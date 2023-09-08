import { db } from "../config/database";
import { TablesInsertProps } from "../config/database.types";

const transactionsTable = db.from("Transactions");

export const TransactionsService = {
  list(walletId: string) {
    return transactionsTable.select().eq("wallet_id", walletId);
  },
  create(props: TablesInsertProps<"Transactions">) {
    return transactionsTable.insert([props]).select();
  },
  delete(transactionId: string) {
    return transactionsTable.delete().eq("id", transactionId);
  },
  update(props: TablesInsertProps<"Transactions">) {
    return transactionsTable.update(props).eq("id", props.id);
  },
};
