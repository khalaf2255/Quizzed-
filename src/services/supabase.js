 
import { createClient } from '@supabase/supabase-js'; 
export const supabaseUrl =  'https://xpcksiqnbxvalyhnrdrp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwY2tzaXFuYnh2YWx5aG5yZHJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2ODUzNDgsImV4cCI6MjAxNTI2MTM0OH0.Uc9tkfrkguFdyBW-KEomGR0BGx2PmSTRuqLTWSQbNX0';
 const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
 