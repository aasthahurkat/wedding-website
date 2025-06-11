const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...');
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/20250609_photos_and_auth.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Split the migration into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error.message);
          // Continue with next statement for now
        } else {
          console.log(`✅ Statement ${i + 1} completed successfully`);
        }
      } catch (err) {
        console.error(`❌ Exception in statement ${i + 1}:`, err.message);
      }
    }
    
    console.log('🎉 Migration completed!');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Alternative approach: Use raw SQL execution
async function runMigrationDirect() {
  try {
    console.log('🚀 Starting database migration (direct approach)...');
    
    // Read the migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/20250609_photos_and_auth.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📝 Executing migration SQL...');
    
    // Try to execute the entire migration at once
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({ sql: migrationSQL })
    });
    
    if (response.ok) {
      console.log('✅ Migration executed successfully!');
    } else {
      const error = await response.text();
      console.error('❌ Migration failed:', error);
    }
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
  }
}

// Run the migration
console.log('🔧 Running database migration for wedding website...');
runMigrationDirect(); 