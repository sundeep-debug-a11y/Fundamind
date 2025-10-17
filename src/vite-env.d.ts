/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase Configuration
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_API_URL: string
  // Stock API Configuration
  readonly VITE_ALPHA_VANTAGE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
