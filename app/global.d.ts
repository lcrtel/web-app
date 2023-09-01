import type { Database as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
    type RouteOffer = DB["public"]["Tables"]["route_offers"]["Row"];
    type BuyingTarget = DB["public"]["Tables"]["buying_targets"]["Row"];
    type SelectedRoute = DB["public"]["Tables"]["selected_routes"]["Row"];
    type PurchaseRequest = DB["public"]["Tables"]["purchase_requests"]["Row"];
    type Invoice = DB["public"]["Tables"]["invoices"]["Row"];
}
