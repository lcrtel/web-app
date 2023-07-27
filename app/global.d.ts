import type { Database as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
    type Route = DB["public"]["Tables"]["routes"]["Row"];
}
