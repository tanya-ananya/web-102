import { createClient } from "@supabase/supabase-js";

const URL = 'https://kpgmvsbknlazzbmxxaun.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZ212c2JrbmxhenpibXh4YXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0ODA5NzYsImV4cCI6MjA2MDA1Njk3Nn0.sg0uiH04YKI9hEXEU12AB9l3QJ7tazWs6U_CCbOYKrw'

export const supabase = createClient(URL, API_KEY);
