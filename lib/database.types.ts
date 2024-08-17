export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
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
          },
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
          },
        ]
      }
      notifications: {
        Row: {
          is_read: boolean | null
          message: string | null
          notification_id: number
          notification_type: string | null
          status: string
          timestamp: string
          user_id: string
        }
        Insert: {
          is_read?: boolean | null
          message?: string | null
          notification_id?: number
          notification_type?: string | null
          status?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          is_read?: boolean | null
          message?: string | null
          notification_id?: number
          notification_type?: string | null
          status?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications _user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          },
        ]
      }
      phone_codes: {
        Row: {
          code: number
          name: string | null
          value: string | null
        }
        Insert: {
          code: number
          name?: string | null
          value?: string | null
        }
        Update: {
          code?: number
          name?: string | null
          value?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          agent_id: string | null
          balance: string | null
          company_name: string | null
          departments: Json | null
          email: string | null
          finance_department: Json | null
          id: string
          name: string | null
          noc_department: Json | null
          over_draft: string | null
          payment_method: Json | null
          phone: string | null
          sales_department: Json | null
          skype_id: string | null
          vos_client_id: string | null
          vos_vendor_id: string | null
        }
        Insert: {
          agent_id?: string | null
          balance?: string | null
          company_name?: string | null
          departments?: Json | null
          email?: string | null
          finance_department?: Json | null
          id: string
          name?: string | null
          noc_department?: Json | null
          over_draft?: string | null
          payment_method?: Json | null
          phone?: string | null
          sales_department?: Json | null
          skype_id?: string | null
          vos_client_id?: string | null
          vos_vendor_id?: string | null
        }
        Update: {
          agent_id?: string | null
          balance?: string | null
          company_name?: string | null
          departments?: Json | null
          email?: string | null
          finance_department?: Json | null
          id?: string
          name?: string | null
          noc_department?: Json | null
          over_draft?: string | null
          payment_method?: Json | null
          phone?: string | null
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
          },
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
          client_id?: string
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
          },
        ]
      }
      roles: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          acd: string
          asr: string
          created_at: string | null
          destination: string
          destination_code: string
          id: string
          new_id: number | null
          pdd: string
          ports: string
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
          created_at?: string | null
          destination: string
          destination_code: string
          id?: string
          new_id?: number | null
          pdd: string
          ports: string
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
          created_at?: string | null
          destination?: string
          destination_code?: string
          id?: string
          new_id?: number | null
          pdd?: string
          ports?: string
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
          },
        ]
      }
      routes_history: {
        Row: {
          acd: string
          asr: string
          destination: string
          destination_code: string
          effective_date: string | null
          id: string
          pdd: string
          ports: string
          rate: string
          route_id: string | null
          route_type: string
          selling_rate: string
        }
        Insert: {
          acd: string
          asr: string
          destination: string
          destination_code: string
          effective_date?: string | null
          id?: string
          pdd: string
          ports: string
          rate: string
          route_id?: string | null
          route_type: string
          selling_rate?: string
        }
        Update: {
          acd?: string
          asr?: string
          destination?: string
          destination_code?: string
          effective_date?: string | null
          id?: string
          pdd?: string
          ports?: string
          rate?: string
          route_id?: string | null
          route_type?: string
          selling_rate?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_history_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
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
          },
        ]
      }
      support_chat: {
        Row: {
          agent_id: string | null
          chat_id: number
          is_agent_message: boolean | null
          message: string | null
          timestamp: string | null
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          chat_id?: number
          is_agent_message?: boolean | null
          message?: string | null
          timestamp?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string | null
          chat_id?: number
          is_agent_message?: boolean | null
          message?: string | null
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_support_chat_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_support_chat_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      targets: {
        Row: {
          acd: string
          asr: string
          buying_rate: number
          client_id: string
          created_at: string | null
          destination: string
          destination_code: string
          id: string
          pdd: string
          ports: string
          rate: string
          route_type: string
          updated_at: string | null
        }
        Insert: {
          acd: string
          asr: string
          buying_rate?: number
          client_id?: string
          created_at?: string | null
          destination: string
          destination_code: string
          id?: string
          pdd: string
          ports: string
          rate: string
          route_type: string
          updated_at?: string | null
        }
        Update: {
          acd?: string
          asr?: string
          buying_rate?: number
          client_id?: string
          created_at?: string | null
          destination?: string
          destination_code?: string
          id?: string
          pdd?: string
          ports?: string
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
          },
        ]
      }
      targets_history: {
        Row: {
          acd: string
          asr: string
          buying_rate: number
          destination: string
          destination_code: string
          effective_date: string | null
          id: string
          pdd: string
          ports: string
          rate: string
          route_type: string
          target_id: string | null
        }
        Insert: {
          acd: string
          asr: string
          buying_rate?: number
          destination: string
          destination_code: string
          effective_date?: string | null
          id?: string
          pdd: string
          ports: string
          rate: string
          route_type: string
          target_id?: string | null
        }
        Update: {
          acd?: string
          asr?: string
          buying_rate?: number
          destination?: string
          destination_code?: string
          effective_date?: string | null
          id?: string
          pdd?: string
          ports?: string
          rate?: string
          route_type?: string
          target_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_targets_history_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "targets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          role: string | null
          user_id: string
        }
        Insert: {
          role?: string | null
          user_id: string
        }
        Update: {
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_roles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "public_user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
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
          },
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
          },
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

