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
      buying_targets: {
        Row: {
          acd: string
          asr: string
          buyer_id: string
          buying_rate: number | null
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
          buying_rate?: number | null
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
          buying_rate?: number | null
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
      deals: {
        Row: {
          buyer_id: string
          confirmed_at: string | null
          created_at: string
          deal_id: number
          price: number
          route_id: string
          seller_id: string
          status: string
        }
        Insert: {
          buyer_id: string
          confirmed_at?: string | null
          created_at?: string
          deal_id?: number
          price: number
          route_id: string
          seller_id: string
          status?: string
        }
        Update: {
          buyer_id?: string
          confirmed_at?: string | null
          created_at?: string
          deal_id?: number
          price?: number
          route_id?: string
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_buyer_id_fkey"
            columns: ["buyer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_route_id_fkey"
            columns: ["route_id"]
            referencedRelation: "route_offers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          created_at: string
          deal_id: number
          invoice_id: number
          paid_at: string
          status: string
          total_amount: number
        }
        Insert: {
          created_at?: string
          deal_id: number
          invoice_id?: number
          paid_at: string
          status?: string
          total_amount: number
        }
        Update: {
          created_at?: string
          deal_id?: number
          invoice_id?: number
          paid_at?: string
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoices_deal_id_fkey"
            columns: ["deal_id"]
            referencedRelation: "deals"
            referencedColumns: ["deal_id"]
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
          created_at: string
          invoice_id: number
          paid_at: string
          payment_id: number
          payment_status: string
          payout_status: string
        }
        Insert: {
          amount: number
          created_at?: string
          invoice_id: number
          paid_at: string
          payment_id?: number
          payment_status?: string
          payout_status?: string
        }
        Update: {
          amount?: number
          created_at?: string
          invoice_id?: number
          paid_at?: string
          payment_id?: number
          payment_status?: string
          payout_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            referencedRelation: "invoices"
            referencedColumns: ["invoice_id"]
          }
        ]
      }
      purchase_requests: {
        Row: {
          buyer_id: string
          created_at: string
          message: string | null
          request_id: number
          route_id: string
          status: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          message?: string | null
          request_id?: number
          route_id: string
          status?: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          message?: string | null
          request_id?: number
          route_id?: string
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
            foreignKeyName: "purchase_requests_route_id_fkey"
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
          rate: number
          route_type: string
          seller_id: string
          selling_rate: number | null
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
          rate: number
          route_type: string
          seller_id?: string
          selling_rate?: number | null
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
          rate?: number
          route_type?: string
          seller_id?: string
          selling_rate?: number | null
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
