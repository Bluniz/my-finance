export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          wallet_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          wallet_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          wallet_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Categories_wallet_id_fkey";
            columns: ["wallet_id"];
            referencedRelation: "Wallet";
            referencedColumns: ["id"];
          }
        ];
      };
      Transactions: {
        Row: {
          amount: number;
          category_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          installmentNumber: number | null;
          isFixed: boolean;
          month: number;
          name: string;
          totalInstallmentsQtd: number | null;
          wallet_id: string;
          year: number;
        };
        Insert: {
          amount: number;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          installmentNumber?: number | null;
          isFixed?: boolean;
          month: number;
          name: string;
          totalInstallmentsQtd?: number | null;
          wallet_id: string;
          year: number;
        };
        Update: {
          amount?: number;
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          installmentNumber?: number | null;
          isFixed?: boolean;
          month?: number;
          name?: string;
          totalInstallmentsQtd?: number | null;
          wallet_id?: string;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Transactions_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "Categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Transactions_wallet_id_fkey";
            columns: ["wallet_id"];
            referencedRelation: "Wallet";
            referencedColumns: ["id"];
          }
        ];
      };
      User: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          name: string;
          photo_url: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name: string;
          photo_url?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          name?: string;
          photo_url?: string | null;
        };
        Relationships: [];
      };
      Wallet: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Wallet_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "User";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsertProps<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
