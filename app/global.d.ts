import type { Database as DB } from "@/lib/database.types";

declare global {
    type Database = DB;
    type Route = DB["public"]["Tables"]["routes"]["Row"];
    type RouteHistory = DB["public"]["Tables"]["routes_history"]["Row"];
    type Destination = DB["public"]["Tables"]["phone_codes"]["Row"];
    type Target = DB["public"]["Tables"]["targets"]["Row"];
    type SelectedRoute = DB["public"]["Tables"]["selected_routes"]["Row"];
    type PurchaseRequest = DB["public"]["Tables"]["purchase_requests"]["Row"];
    type Invoice = DB["public"]["Tables"]["invoices"]["Row"];
    type Profile = DB["public"]["Tables"]["profiles"]["Row"];
    type Gateway = DB["public"]["Tables"]["gateways"]["Row"];
    type BankAccount = DB["public"]["Tables"]["bank_accounts"]["Row"];
    type TRVerification = DB["public"]["Tables"]["tr_verifications"]["Row"];
    type Executive = DB["public"]["Tables"]["executives"]["Row"];
    type RateHike = DB["public"]["Tables"]["rate_hikes"]["Row"];
    type AccountRole = "vendor" | "client" | "agent";
    type StatusEnum = DB["public"]["Enums"]["statuses"];
    type UserTypesEnum = DB["public"]["Enums"]["user_types"];
    type UserRolesEnum = DB["public"]["Enums"]["roles_enum"];
}
