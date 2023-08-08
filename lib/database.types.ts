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
        Relationships: []
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
        Relationships: []
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
          posted_on: string | null
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
          posted_on?: string | null
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
          posted_on?: string | null
          prefix?: string
          rate?: number
          route_type?: string
          seller_id?: string
          updated_at?: string | null
          verification_date?: string
          verified_by?: string
        }
        Relationships: []
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
          application_date?: string
          created_at?: string | null
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
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
