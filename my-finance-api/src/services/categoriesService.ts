import { db } from "../config/database";
import { TablesInsertProps } from "../config/database.types";

const categoriesTable = db.from("Categories");

export const CategoriesService = {
  list(walletId: string) {
    return categoriesTable.select().eq("wallet_id", walletId);
  },
  create(props: TablesInsertProps<"Categories">) {
    return categoriesTable.insert([props]).select();
  },
  delete(categoryId: string) {
    return categoriesTable.delete().eq("id", categoryId);
  },
  update(props: Pick<TablesInsertProps<"Categories">, "name" | "id">) {
    return categoriesTable.update(props).eq("id", props.id);
  },
};
