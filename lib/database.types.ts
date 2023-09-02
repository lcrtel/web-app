export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_no: string | null
          account_type: string | null
          bank_name: string | null
          branch: string | null
          id: number
          ifsc_code: string | null
          name: string | null
        }
        Insert: {
          account_no?: string | null
          account_type?: string | null
          bank_name?: string | null
          branch?: string | null
          id?: number
          ifsc_code?: string | null
          name?: string | null
        }
        Update: {
          account_no?: string | null
          account_type?: string | null
          bank_name?: string | null
          branch?: string | null
          id?: number
          ifsc_code?: string | null
          name?: string | null
        }
        Relationships: []
      }
      buying_targets: {
        Row: {
          acd: string
          asr: string
          buyer_id: string
          buying_rate: number
          capacity: string
          created_at: string | null
          destination: string
          destination_code: string
          id: string
          pdd: string
          ports: string
          prefix: string
          rate: number
          route_type: string
          status: string
          updated_at: string | null
        }
        Insert: {
          acd: string
          asr: string
          buyer_id?: string
          buying_rate?: number
          capacity: string
          created_at?: string | null
          destination: string
          destination_code: string
          id?: string
          pdd: string
          ports: string
          prefix: string
          rate: number
          route_type: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          acd?: string
          asr?: string
          buyer_id?: string
          buying_rate?: number
          capacity?: string
          created_at?: string | null
          destination?: string
          destination_code?: string
          id?: string
          pdd?: string
          ports?: string
          prefix?: string
          rate?: number
          route_type?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buying_targets_buyer_id_fkey"
            columns: ["buyer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          agent: string | null
          balance: number | null
          bill_to: Json | null
          connection_id: string | null
          date_due: string | null
          date_issued: string | null
          description: string | null
          invoice_id: number
          invoice_to: string | null
          note: string | null
          paid_at: string | null
          payments: Json | null
          quantity: number | null
          status: string | null
          total_amount: number | null
        }
        Insert: {
          agent?: string | null
          balance?: number | null
          bill_to?: Json | null
          connection_id?: string | null
          date_due?: string | null
          date_issued?: string | null
          description?: string | null
          invoice_id?: number
          invoice_to?: string | null
          note?: string | null
          paid_at?: string | null
          payments?: Json | null
          quantity?: number | null
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          agent?: string | null
          balance?: number | null
          bill_to?: Json | null
          connection_id?: string | null
          date_due?: string | null
          date_issued?: string | null
          description?: string | null
          invoice_id?: number
          invoice_to?: string | null
          note?: string | null
          paid_at?: string | null
          payments?: Json | null
          quantity?: number | null
          status?: string | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "route_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_invoice_to_fkey"
            columns: ["invoice_to"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      "notifications ": {
        Row: {
          date_sent: string
          message: string | null
          notification_id: number
          status: string
          user_id: string
        }
        Insert: {
          date_sent?: string
          message?: string | null
          notification_id?: number
          status?: string
          user_id: string
        }
        Update: {
          date_sent?: string
          message?: string | null
          notification_id?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications _user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          amount: number
          connection_id: string | null
          created_at: string
          invoice_id: number
          paid_at: string
          payment_id: number
          payment_status: string
          payout_status: string
          user_id: string
        }
        Insert: {
          amount: number
          connection_id?: string | null
          created_at?: string
          invoice_id: number
          paid_at: string
          payment_id?: number
          payment_status?: string
          payout_status?: string
          user_id: string
        }
        Update: {
          amount?: number
          connection_id?: string | null
          created_at?: string
          invoice_id?: number
          paid_at?: string
          payment_id?: number
          payment_status?: string
          payout_status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "route_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          email: string | null
          finance_department: Json | null
          first_name: string | null
          id: string
          last_name: string | null
          noc_dipartment: Json | null
          payment_method: Json | null
          phone: string | null
          role: string | null
          sales_dipartment: Json | null
          skype_id: string | null
        }
        Insert: {
          email?: string | null
          finance_department?: Json | null
          first_name?: string | null
          id: string
          last_name?: string | null
          noc_dipartment?: Json | null
          payment_method?: Json | null
          phone?: string | null
          role?: string | null
          sales_dipartment?: Json | null
          skype_id?: string | null
        }
        Update: {
          email?: string | null
          finance_department?: Json | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          noc_dipartment?: Json | null
          payment_method?: Json | null
          phone?: string | null
          role?: string | null
          sales_dipartment?: Json | null
          skype_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      purchase_requests: {
        Row: {
          buyer_id: string
          buying_rate: string | null
          connection_id: string | null
          created_at: string
          id: string
          message: string | null
          payment_type: string
          route_id: string
          seller_id: string | null
          status: string
        }
        Insert: {
          buyer_id?: string
          buying_rate?: string | null
          connection_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          payment_type: string
          route_id: string
          seller_id?: string | null
          status?: string
        }
        Update: {
          buyer_id?: string
          buying_rate?: string | null
          connection_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          payment_type?: string
          route_id?: string
          seller_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_buyer_id_fkey"
            columns: ["buyer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_connection_id_fkey"
            columns: ["connection_id"]
            referencedRelation: "route_connections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_route_id_fkey"
            columns: ["route_id"]
            referencedRelation: "route_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      route_connections: {
        Row: {
          buyer_id: string
          expiration_date: string
          id: string
          route_id: string
          status: string
        }
        Insert: {
          buyer_id: string
          expiration_date: string
          id?: string
          route_id: string
          status: string
        }
        Update: {
          buyer_id?: string
          expiration_date?: string
          id?: string
          route_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "route_connections_buyer_id_fkey"
            columns: ["buyer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_connections_route_id_fkey"
            columns: ["route_id"]
            referencedRelation: "route_offers"
            referencedColumns: ["id"]
          }
        ]
      }
      route_offers: {
        Row: {
          acd: string
          asr: string
          capacity: string
          created_at: string | null
          destination: string
          destination_code: string
          id: string
          pdd: string
          ports: string
          prefix: string
          rate: string
          route_type: string
          seller_id: string
          selling_rate: string
          updated_at: string | null
          verification: string
          verification_by: string | null
          verified_at: string | null
        }
        Insert: {
          acd: string
          asr: string
          capacity: string
          created_at?: string | null
          destination: string
          destination_code: string
          id?: string
          pdd: string
          ports: string
          prefix: string
          rate: string
          route_type: string
          seller_id?: string
          selling_rate?: string
          updated_at?: string | null
          verification?: string
          verification_by?: string | null
          verified_at?: string | null
        }
        Update: {
          acd?: string
          asr?: string
          capacity?: string
          created_at?: string | null
          destination?: string
          destination_code?: string
          id?: string
          pdd?: string
          ports?: string
          prefix?: string
          rate?: string
          route_type?: string
          seller_id?: string
          selling_rate?: string
          updated_at?: string | null
          verification?: string
          verification_by?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_offers_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      selected_routes: {
        Row: {
          id: string
          route_id: string
          user_id: string
        }
        Insert: {
          id?: string
          route_id: string
          user_id?: string
        }
        Update: {
          id?: string
          route_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "selected_routes_route_id_fkey"
            columns: ["route_id"]
            referencedRelation: "route_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "selected_routes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      watchlist: {
        Row: {
          id: number
          route_id: string
          user_id: string | null
        }
        Insert: {
          id?: number
          route_id: string
          user_id?: string | null
        }
        Update: {
          id?: number
          route_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_route_id_fkey"
            columns: ["route_id"]
            referencedRelation: "route_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watchlist_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
