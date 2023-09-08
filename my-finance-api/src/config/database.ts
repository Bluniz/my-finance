import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const db = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SECRET_KEY || ""
);
