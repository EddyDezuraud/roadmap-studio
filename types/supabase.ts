export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      columns: {
        Row: {
          id: number
          name: string
          roadmap_id: number | null
          show: boolean | null
          size: number
          start: number
        }
        Insert: {
          id?: number
          name: string
          roadmap_id?: number | null
          show?: boolean | null
          size: number
          start: number
        }
        Update: {
          id?: number
          name?: string
          roadmap_id?: number | null
          show?: boolean | null
          size?: number
          start?: number
        }
        Relationships: [
          {
            foreignKeyName: "columns_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmap"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          id: number
          name: string
          stage_id: number | null
        }
        Insert: {
          id?: number
          name: string
          stage_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          stage_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      lines: {
        Row: {
          id: number
          index: number
          segment_id: number | null
        }
        Insert: {
          id?: number
          index: number
          segment_id?: number | null
        }
        Update: {
          id?: number
          index?: number
          segment_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lines_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "product_segments"
            referencedColumns: ["id"]
          },
        ]
      }
      markers: {
        Row: {
          color: string | null
          date: string | null
          description: string | null
          full_month: boolean | null
          id: number
          roadmap_id: number
          show: boolean | null
          title: string | null
        }
        Insert: {
          color?: string | null
          date?: string | null
          description?: string | null
          full_month?: boolean | null
          id?: number
          roadmap_id: number
          show?: boolean | null
          title?: string | null
        }
        Update: {
          color?: string | null
          date?: string | null
          description?: string | null
          full_month?: boolean | null
          id?: number
          roadmap_id?: number
          show?: boolean | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "markers_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmap"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
      }
      product_segments: {
        Row: {
          id: number
          index: number | null
          name: string
          product_id: number | null
        }
        Insert: {
          id?: number
          index?: number | null
          name: string
          product_id?: number | null
        }
        Update: {
          id?: number
          index?: number | null
          name?: string
          product_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "segments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          color: string
          id: number
          name: string
          roadmap_id: number | null
        }
        Insert: {
          color: string
          id?: number
          name: string
          roadmap_id?: number | null
        }
        Update: {
          color?: string
          id?: number
          name?: string
          roadmap_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "roadmap"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap: {
        Row: {
          col_size: number
          date_end: string | null
          date_start: string | null
          id: number
          organization_id: number | null
          subtitle: string | null
          title: string
        }
        Insert: {
          col_size: number
          date_end?: string | null
          date_start?: string | null
          id?: number
          organization_id?: number | null
          subtitle?: string | null
          title: string
        }
        Update: {
          col_size?: number
          date_end?: string | null
          date_start?: string | null
          id?: number
          organization_id?: number | null
          subtitle?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      stages: {
        Row: {
          color: string | null
          id: number
          name: string
        }
        Insert: {
          color?: string | null
          id?: number
          name: string
        }
        Update: {
          color?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      task_stage_jobs: {
        Row: {
          id: number
          index: number | null
          job_id: number
          task_stage_id: number | null
        }
        Insert: {
          id?: number
          index?: number | null
          job_id: number
          task_stage_id?: number | null
        }
        Update: {
          id?: number
          index?: number | null
          job_id?: number
          task_stage_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "task_stage_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_stage_jobs_task_stage_id_fkey"
            columns: ["task_stage_id"]
            isOneToOne: false
            referencedRelation: "task_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      task_stages: {
        Row: {
          days: number
          id: number
          index: number
          infinite: boolean | null
          stage_id: number | null
          task_id: number | null
        }
        Insert: {
          days: number
          id?: number
          index: number
          infinite?: boolean | null
          stage_id?: number | null
          task_id?: number | null
        }
        Update: {
          days?: number
          id?: number
          index?: number
          infinite?: boolean | null
          stage_id?: number | null
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_stages_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          id: number
          info: string | null
          line_id: number | null
          logo: string | null
          name: string
          segment_id: number | null
          start_date: string | null
          subtitle: string | null
        }
        Insert: {
          id?: number
          info?: string | null
          line_id?: number | null
          logo?: string | null
          name: string
          segment_id?: number | null
          start_date?: string | null
          subtitle?: string | null
        }
        Update: {
          id?: number
          info?: string | null
          line_id?: number | null
          logo?: string | null
          name?: string
          segment_id?: number | null
          start_date?: string | null
          subtitle?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_line_id_fkey"
            columns: ["line_id"]
            isOneToOne: false
            referencedRelation: "lines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "product_segments"
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
