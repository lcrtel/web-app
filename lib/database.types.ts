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
      agents: {
        Row: {
          clients: number | null
          created_at: string
          id: string
          routes: number | null
          targets: number | null
          vendors: number | null
        }
        Insert: {
          clients?: number | null
          created_at?: string
          id: string
          routes?: number | null
          targets?: number | null
          vendors?: number | null
        }
        Update: {
          clients?: number | null
          created_at?: string
          id?: string
          routes?: number | null
          targets?: number | null
          vendors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agents_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      config: {
        Row: {
          created_at: string | null
          details: Json | null
          id: number
          type: string | null
        }
        Insert: {
          created_at?: string | null
          details?: Json | null
          id?: number
          type?: string | null
        }
        Update: {
          created_at?: string | null
          details?: Json | null
          id?: number
          type?: string | null
        }
        Relationships: []
      }
      gateways: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          name: string | null
          payment_type: string | null
          rate: string | null
          route_id: string
          status: string
          total_calls: number | null
          total_duration: number | null
          updated_on: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          name?: string | null
          payment_type?: string | null
          rate?: string | null
          route_id: string
          status: string
          total_calls?: number | null
          total_duration?: number | null
          updated_on?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          name?: string | null
          payment_type?: string | null
          rate?: string | null
          route_id?: string
          status?: string
          total_calls?: number | null
          total_duration?: number | null
          updated_on?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gateways_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gateways_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          balance: string | null
          bill_to: Json | null
          date_due: string | null
          date_issued: string | null
          description: string | null
          invoice_id: number
          invoice_to: string | null
          note: string | null
          paid_at: string | null
          status: string | null
          total_amount: string | null
        }
        Insert: {
          balance?: string | null
          bill_to?: Json | null
          date_due?: string | null
          date_issued?: string | null
          description?: string | null
          invoice_id?: number
          invoice_to?: string | null
          note?: string | null
          paid_at?: string | null
          status?: string | null
          total_amount?: string | null
        }
        Update: {
          balance?: string | null
          bill_to?: Json | null
          date_due?: string | null
          date_issued?: string | null
          description?: string | null
          invoice_id?: number
          invoice_to?: string | null
          note?: string | null
          paid_at?: string | null
          status?: string | null
          total_amount?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_invoice_to_fkey"
            columns: ["invoice_to"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          amount: string
          created_at: string
          gateway: string | null
          invoice_id: number
          paid_at: string
          payment_id: number
          payment_method: string | null
          payment_status: string
          user_id: string | null
        }
        Insert: {
          amount: string
          created_at?: string
          gateway?: string | null
          invoice_id: number
          paid_at: string
          payment_id?: number
          payment_method?: string | null
          payment_status?: string
          user_id?: string | null
        }
        Update: {
          amount?: string
          created_at?: string
          gateway?: string | null
          invoice_id?: number
          paid_at?: string
          payment_id?: number
          payment_method?: string | null
          payment_status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_gateway_fkey"
            columns: ["gateway"]
            isOneToOne: false
            referencedRelation: "gateways"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          agent_id: string | null
          balance: string | null
          company_name: string | null
          email: string | null
          finance_department: Json | null
          id: string
          name: string | null
          noc_department: Json | null
          over_draft: string | null
          payment_method: Json | null
          phone: string | null
          role: string | null
          sales_department: Json | null
          skype_id: string | null
          vos_client_id: string | null
          vos_vendor_id: string | null
        }
        Insert: {
          agent_id?: string | null
          balance?: string | null
          company_name?: string | null
          email?: string | null
          finance_department?: Json | null
          id: string
          name?: string | null
          noc_department?: Json | null
          over_draft?: string | null
          payment_method?: Json | null
          phone?: string | null
          role?: string | null
          sales_department?: Json | null
          skype_id?: string | null
          vos_client_id?: string | null
          vos_vendor_id?: string | null
        }
        Update: {
          agent_id?: string | null
          balance?: string | null
          company_name?: string | null
          email?: string | null
          finance_department?: Json | null
          id?: string
          name?: string | null
          noc_department?: Json | null
          over_draft?: string | null
          payment_method?: Json | null
          phone?: string | null
          role?: string | null
          sales_department?: Json | null
          skype_id?: string | null
          vos_client_id?: string | null
          vos_vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      purchase_requests: {
        Row: {
          client_id: string
          communication_status: string
          created_at: string
          id: string
          ip: string | null
          payment_type: string
          route_id: string
          status: string
          vos_status: string | null
          whatsapp_no: string | null
        }
        Insert: {
          client_id: string
          communication_status?: string
          created_at?: string
          id?: string
          ip?: string | null
          payment_type: string
          route_id: string
          status?: string
          vos_status?: string | null
          whatsapp_no?: string | null
        }
        Update: {
          client_id?: string
          communication_status?: string
          created_at?: string
          id?: string
          ip?: string | null
          payment_type?: string
          route_id?: string
          status?: string
          vos_status?: string | null
          whatsapp_no?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_requests_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          }
        ]
      }
      routes: {
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
          selling_rate: string
          updated_at: string | null
          vendor_id: string | null
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
          selling_rate?: string
          updated_at?: string | null
          vendor_id?: string | null
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
          selling_rate?: string
          updated_at?: string | null
          vendor_id?: string | null
          verification?: string
          verification_by?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "routes_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "selected_routes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      targets: {
        Row: {
          acd: string
          asr: string
          buying_rate: number
          capacity: string
          client_id: string
          created_at: string | null
          destination: string
          destination_code: string
          id: string
          pdd: string
          ports: string
          prefix: string
          rate: string
          route_type: string
          updated_at: string | null
        }
        Insert: {
          acd: string
          asr: string
          buying_rate?: number
          capacity: string
          client_id?: string
          created_at?: string | null
          destination: string
          destination_code: string
          id?: string
          pdd: string
          ports: string
          prefix: string
          rate: string
          route_type: string
          updated_at?: string | null
        }
        Update: {
          acd?: string
          asr?: string
          buying_rate?: number
          capacity?: string
          client_id?: string
          created_at?: string | null
          destination?: string
          destination_code?: string
          id?: string
          pdd?: string
          ports?: string
          prefix?: string
          rate?: string
          route_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "targets_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      wallet: {
        Row: {
          ballence: number | null
          created_at: string
          updated_at: string | null
          user_id: string | null
          wallet_id: number
        }
        Insert: {
          ballence?: number | null
          created_at?: string
          updated_at?: string | null
          user_id?: string | null
          wallet_id?: number
        }
        Update: {
          ballence?: number | null
          created_at?: string
          updated_at?: string | null
          user_id?: string | null
          wallet_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "wallet_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
