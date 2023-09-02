import type { Database as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
    type RouteOffer = DB["public"]["Tables"]["route_offers"]["Row"];
    type BuyingTarget = DB["public"]["Tables"]["buying_targets"]["Row"];
    type SelectedRoute = DB["public"]["Tables"]["selected_routes"]["Row"];
    type PurchaseRequest = DB["public"]["Tables"]["purchase_requests"]["Row"];
    type Invoice = DB["public"]["Tables"]["invoices"]["Row"];
    type Profile = DB["public"]["Tables"]["profiles"]["Row"];
    type Connection = DB["public"]["Tables"]["route_connections"]["Row"];
    type BankAccount = DB["public"]["Tables"]["bank_accounts"]["Row"];
}
