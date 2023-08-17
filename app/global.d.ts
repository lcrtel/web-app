import type { Database as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
    type RouteOffer = DB["public"]["Tables"]["route_offers"]["Row"];
    type BuyingTarget = DB["public"]["Tables"]["buying_targets"]["Row"];
    type User = DB["auth"]["Tables"]["users"]["Row"];
}
