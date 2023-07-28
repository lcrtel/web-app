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
      routes: {
        Row: {
          acd: number
          asr: number
          capacity: number
          created_at: string | null
          destination: string
          destination_code: number | null
          id: string
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id: string | null
          status: string
          updated_at: string | null
          verification_by: string | null
          verified_at: string | null
        }
        Insert: {
          acd: number
          asr: number
          capacity: number
          created_at?: string | null
          destination: string
          destination_code?: number | null
          id?: string
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id?: string | null
          status: string
          updated_at?: string | null
          verification_by?: string | null
          verified_at?: string | null
        }
        Update: {
          acd?: number
          asr?: number
          capacity?: number
          created_at?: string | null
          destination?: string
          destination_code?: number | null
          id?: string
          ports?: number
          prefix?: string
          rate?: number
          route_type?: string
          seller_id?: string | null
          status?: string
          updated_at?: string | null
          verification_by?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_verification_by_fkey"
            columns: ["verification_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          skype_id: string | null
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string
          skype_id?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          skype_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
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
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
