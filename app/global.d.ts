import type { Database as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
    type Route = DB["public"]["Tables"]["routes"]["Row"];
    type RouteHistory = DB["public"]["Tables"]["routes_history"]["Row"];
    type Target = DB["public"]["Tables"]["targets"]["Row"];
    type SelectedRoute = DB["public"]["Tables"]["selected_routes"]["Row"];
    type PurchaseRequest = DB["public"]["Tables"]["purchase_requests"]["Row"];
    type Invoice = DB["public"]["Tables"]["invoices"]["Row"];
    type Profile = DB["public"]["Tables"]["profiles"]["Row"];
    type Gateway = DB["public"]["Tables"]["gateways"]["Row"];
    type BankAccount = DB["public"]["Tables"]["bank_accounts"]["Row"];
    type AccountRole = "vendor" | "client" | "agent";
}
