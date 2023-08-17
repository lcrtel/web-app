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
          status: string
          updated_at: string | null
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
          status?: string
          updated_at?: string | null
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
          status?: string
          updated_at?: string | null
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
