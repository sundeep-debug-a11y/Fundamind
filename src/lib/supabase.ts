import { createClient } from '@supabase/supabase-js'

// These should be environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for better TypeScript support
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          age: number
          designation: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone: string
          age: number
          designation: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          age?: number
          designation?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
