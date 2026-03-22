export type Json
  = | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.1'
  }
  public: {
    Tables: {
      invitation_keys: {
        Row: {
          created_by: string | null
          expires_at: string | null
          id: string
          is_used: boolean | null
          key: string
          organization_id: string | null
          role_assigned: Database['public']['Enums']['membership_role']
        }
        Insert: {
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_used?: boolean | null
          key: string
          organization_id?: string | null
          role_assigned: Database['public']['Enums']['membership_role']
        }
        Update: {
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_used?: boolean | null
          key?: string
          organization_id?: string | null
          role_assigned?: Database['public']['Enums']['membership_role']
        }
        Relationships: [
          {
            foreignKeyName: 'invitation_keys_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'invitation_keys_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          }
        ]
      }
      memberships: {
        Row: {
          id: string
          joined_at: string | null
          organization_id: string | null
          profile_id: string | null
          role: Database['public']['Enums']['membership_role']
        }
        Insert: {
          id?: string
          joined_at?: string | null
          organization_id?: string | null
          profile_id?: string | null
          role: Database['public']['Enums']['membership_role']
        }
        Update: {
          id?: string
          joined_at?: string | null
          organization_id?: string | null
          profile_id?: string | null
          role?: Database['public']['Enums']['membership_role']
        }
        Relationships: [
          {
            foreignKeyName: 'memberships_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'memberships_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      organizations: {
        Row: {
          brands: string[] | null
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
        }
        Insert: {
          brands?: string[] | null
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
        }
        Update: {
          brands?: string[] | null
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'organizations_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          assigned_customer_codes: string[] | null
          company_name: string | null
          customer_code: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database['public']['Enums']['user_role']
        }
        Insert: {
          assigned_customer_codes?: string[] | null
          company_name?: string | null
          customer_code?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database['public']['Enums']['user_role']
        }
        Update: {
          assigned_customer_codes?: string[] | null
          company_name?: string | null
          customer_code?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database['public']['Enums']['user_role']
        }
        Relationships: []
      }
      spare_parts_lists: {
        Row: {
          created_at: string | null
          id: string
          items: Json | null
          name: string
          organization_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          items?: Json | null
          name: string
          organization_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          items?: Json | null
          name?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'spare_parts_lists_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          }
        ]
      }
      tickets: {
        Row: {
          comments: string | null
          created_at: string | null
          customer_name: string
          customer_phone: string | null
          display_ref: string | null
          final_solution: Database['public']['Enums']['ticket_solution'] | null
          id: string
          incremental_id: number
          organization_id: string | null
          photo_urls: string[] | null
          product_name: string
          product_problem: string
          product_ref: string
          purchase_date: string | null
          quantity: number | null
          requested_solution:
            | Database['public']['Enums']['ticket_solution']
            | null
          status: Database['public']['Enums']['ticket_status'] | null
          status_history: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          created_at?: string | null
          customer_name: string
          customer_phone?: string | null
          display_ref?: string | null
          final_solution?: Database['public']['Enums']['ticket_solution'] | null
          id?: string
          incremental_id?: number
          organization_id?: string | null
          photo_urls?: string[] | null
          product_name: string
          product_problem: string
          product_ref: string
          purchase_date?: string | null
          quantity?: number | null
          requested_solution?:
            | Database['public']['Enums']['ticket_solution']
            | null
          status?: Database['public']['Enums']['ticket_status'] | null
          status_history?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          created_at?: string | null
          customer_name?: string
          customer_phone?: string | null
          display_ref?: string | null
          final_solution?: Database['public']['Enums']['ticket_solution'] | null
          id?: string
          incremental_id?: number
          organization_id?: string | null
          photo_urls?: string[] | null
          product_name?: string
          product_problem?: string
          product_ref?: string
          purchase_date?: string | null
          quantity?: number | null
          requested_solution?:
            | Database['public']['Enums']['ticket_solution']
            | null
          status?: Database['public']['Enums']['ticket_status'] | null
          status_history?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'tickets_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
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
      membership_role: 'technician' | 'commercial' | 'customer'
      ticket_solution:
        | 'Echange'
        | 'Avoir'
        | 'Reparation'
        | 'Refus'
        | 'Envoi pieces detachees'
      ticket_status:
        | 'Nouveau'
        | 'En cours'
        | 'En attente piece'
        | 'Termine'
        | 'Annule'
      user_role:
        | 'Client'
        | 'Commercial'
        | 'TechnicienSav'
        | 'Admin'
        | 'commercial'
        | 'technicien'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
      & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    & DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables']
    & DefaultSchema['Views'])
    ? (DefaultSchema['Tables']
      & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema['Tables']
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema['Enums']
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema['CompositeTypes']
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      membership_role: ['technician', 'commercial', 'customer'],
      ticket_solution: [
        'Echange',
        'Avoir',
        'Reparation',
        'Refus',
        'Envoi pieces detachees'
      ],
      ticket_status: [
        'Nouveau',
        'En cours',
        'En attente piece',
        'Termine',
        'Annule'
      ],
      user_role: [
        'Client',
        'Commercial',
        'TechnicienSav',
        'Admin',
        'commercial',
        'technicien'
      ]
    }
  }
} as const
