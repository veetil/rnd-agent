#!/usr/bin/env node

/**
 * This script applies SQL migrations to your Supabase project
 * It reads the SQL files from the migrations directory and executes them
 * against your Supabase database.
 * 
 * Usage:
 * node scripts/apply-migrations.js
 * 
 * Environment variables:
 * SUPABASE_URL - Your Supabase project URL
 * SUPABASE_SERVICE_ROLE_KEY - Your Supabase service role key (not the anon key)
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Check for required environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required');
  console.error('Please set these variables in your .env file or export them in your terminal');
  process.exit(1);
}

// Create Supabase client with service role key for admin privileges
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Path to migrations directory
const migrationsDir = path.join(__dirname, '..', 'migrations');

async function applyMigrations() {
  try {
    // Read all SQL files from migrations directory
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort(); // Sort to ensure migrations are applied in order
    
    if (files.length === 0) {
      console.log('No migration files found');
      return;
    }
    
    console.log(`Found ${files.length} migration files`);
    
    // Apply each migration
    for (const file of files) {
      console.log(`Applying migration: ${file}`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      // Execute the SQL
      const { error } = await supabase.rpc('pgmigrate', { query: sql });
      
      if (error) {
        console.error(`Error applying migration ${file}:`, error);
        process.exit(1);
      }
      
      console.log(`Successfully applied migration: ${file}`);
    }
    
    console.log('All migrations applied successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
    process.exit(1);
  }
}

// Create pgmigrate function if it doesn't exist
async function createMigrationFunction() {
  try {
    const { error } = await supabase.rpc('pgmigrate_exists');
    
    // If the function doesn't exist, create it
    if (error && error.message.includes('function "pgmigrate_exists" does not exist')) {
      console.log('Creating pgmigrate function...');
      
      const createFunctionSql = `
        -- Function to check if pgmigrate exists
        CREATE OR REPLACE FUNCTION pgmigrate_exists() RETURNS boolean AS $$
        BEGIN
          RETURN true;
        END;
        $$ LANGUAGE plpgsql;
        
        -- Function to execute SQL migrations
        CREATE OR REPLACE FUNCTION pgmigrate(query text) RETURNS void AS $$
        BEGIN
          EXECUTE query;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `;
      
      const { error: createError } = await supabase.rpc('exec', { query: createFunctionSql });
      
      if (createError) {
        // If exec function doesn't exist, create it first
        if (createError.message.includes('function "exec" does not exist')) {
          const createExecSql = `
            CREATE OR REPLACE FUNCTION exec(query text) RETURNS void AS $$
            BEGIN
              EXECUTE query;
            END;
            $$ LANGUAGE plpgsql SECURITY DEFINER;
          `;
          
          const { error: execError } = await supabase.query(createExecSql);
          
          if (execError) {
            console.error('Error creating exec function:', execError);
            process.exit(1);
          }
          
          // Try creating pgmigrate again
          const { error: retryError } = await supabase.query(createFunctionSql);
          
          if (retryError) {
            console.error('Error creating pgmigrate function:', retryError);
            process.exit(1);
          }
        } else {
          console.error('Error creating pgmigrate function:', createError);
          process.exit(1);
        }
      }
      
      console.log('Successfully created pgmigrate function');
    } else {
      console.log('pgmigrate function already exists');
    }
  } catch (error) {
    console.error('Error checking/creating migration function:', error);
    
    // Fallback: try direct SQL execution
    try {
      console.log('Attempting direct SQL execution...');
      
      // Try to create the waitlist table directly
      const createTableSql = fs.readFileSync(path.join(migrationsDir, 'create_waitlist_table.sql'), 'utf8');
      const { error: directError } = await supabase.query(createTableSql);
      
      if (directError) {
        console.error('Error with direct SQL execution:', directError);
        process.exit(1);
      }
      
      console.log('Successfully applied migration directly');
      process.exit(0);
    } catch (directError) {
      console.error('Error with fallback approach:', directError);
      process.exit(1);
    }
  }
}

// Main function
async function main() {
  try {
    console.log('Starting migration process...');
    
    // Create migration function if needed
    await createMigrationFunction();
    
    // Apply migrations
    await applyMigrations();
    
    console.log('Migration process completed successfully');
  } catch (error) {
    console.error('Migration process failed:', error);
    process.exit(1);
  }
}

// Run the main function
main();