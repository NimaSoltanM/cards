import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://awwsveqlmbhwycjksxgc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3d3N2ZXFsbWJod3ljamtzeGdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU0NTY3NDMsImV4cCI6MjAwMTAzMjc0M30.1rwPNeFDpBVGU3rT39pp0DI5RHNp-d7q9R5hSwjQudQ'
);
