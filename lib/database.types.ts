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
      route_posts: {
        Row: {
          acd: number
          asr: number
          capacity: number
          created_at: string | null
          destination: string
          destination_code: number | null
          id: string
          pdd: number | null
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
          pdd?: number | null
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id?: string | null
          status?: string
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
          pdd?: number | null
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
            foreignKeyName: "route_posts_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_posts_verification_by_fkey"
            columns: ["verification_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      route_requests: {
        Row: {
          acd: number
          asr: number
          capacity: number
          created_at: string | null
          customer_id: string | null
          destination: string
          destination_code: number | null
          id: string
          pdd: number | null
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          acd: number
          asr: number
          capacity: number
          created_at?: string | null
          customer_id?: string | null
          destination: string
          destination_code?: number | null
          id?: string
          pdd?: number | null
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          acd?: number
          asr?: number
          capacity?: number
          created_at?: string | null
          customer_id?: string | null
          destination?: string
          destination_code?: number | null
          id?: string
          pdd?: number | null
          ports?: number
          prefix?: string
          rate?: number
          route_type?: string
          seller_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "route_requests_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "route_requests_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      routes: {
        Row: {
          acd: number
          asr: number
          capacity: number
          created_at: string | null
          destination: string
          destination_code: number | null
          id: string
          pdd: number | null
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id: string
          updated_at: string | null
          verification_date: string
          verified_by: string
        }
        Insert: {
          acd: number
          asr: number
          capacity: number
          created_at?: string | null
          destination: string
          destination_code?: number | null
          id?: string
          pdd?: number | null
          ports: number
          prefix: string
          rate: number
          route_type: string
          seller_id: string
          updated_at?: string | null
          verification_date: string
          verified_by: string
        }
        Update: {
          acd?: number
          asr?: number
          capacity?: number
          created_at?: string | null
          destination?: string
          destination_code?: number | null
          id?: string
          pdd?: number | null
          ports?: number
          prefix?: string
          rate?: number
          route_type?: string
          seller_id?: string
          updated_at?: string | null
          verification_date?: string
          verified_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      seller_applications: {
        Row: {
          application_date: string
          created_at: string | null
          id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_date: string
          created_at?: string | null
          id: string
          status: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_date?: string
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seller_applications_user_id_fkey"
            columns: ["user_id"]
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
