// Test Supabase Connection
require("dotenv").config({ path: ".env" });
const { createClient } = require("@supabase/supabase-js");

async function testSupabaseConnection() {
  console.log("🧪 Testing Supabase Connection...\n");

  try {
    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("✅ Supabase client created successfully");
    console.log(`📍 URL: ${supabaseUrl}`);
    console.log(`🔑 Key: ${supabaseKey.substring(0, 20)}...`);

    // Test basic connection by checking if we can access the database
    console.log("\n🔍 Testing database connection...");

    // Try to query the categories table (should exist based on schema)
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .limit(5);

    if (categoriesError) {
      console.log(
        "⚠️  Categories table query failed:",
        categoriesError.message,
      );
      console.log("   This might be expected if tables don't exist yet");
    } else {
      console.log("✅ Categories table accessible");
      console.log(`📊 Found ${categories.length} categories`);
      if (categories.length > 0) {
        console.log(
          "📋 Sample categories:",
          categories.map((c) => c.name).join(", "),
        );
      }
    }

    // Try to query the products table
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .limit(3);

    if (productsError) {
      console.log("⚠️  Products table query failed:", productsError.message);
      console.log("   This might be expected if tables don't exist yet");
    } else {
      console.log("✅ Products table accessible");
      console.log(`📦 Found ${products.length} products`);
      if (products.length > 0) {
        console.log(
          "🛍️  Sample products:",
          products.map((p) => p.name).join(", "),
        );
      }
    }

    // Try to query the sellers table
    const { data: sellers, error: sellersError } = await supabase
      .from("sellers")
      .select("seller_id, store_name, email")
      .limit(2);

    if (sellersError) {
      console.log("⚠️  Sellers table query failed:", sellersError.message);
      console.log("   This might be expected if tables don't exist yet");
    } else {
      console.log("✅ Sellers table accessible");
      console.log(`🏪 Found ${sellers.length} sellers`);
      if (sellers.length > 0) {
        console.log(
          "👥 Sample sellers:",
          sellers.map((s) => s.store_name).join(", "),
        );
      }
    }

    // Test contact form table
    const { data: contacts, error: contactsError } = await supabase
      .from("contacts")
      .select("*")
      .limit(1);

    if (contactsError) {
      console.log("⚠️  Contacts table query failed:", contactsError.message);
      console.log("   This might be expected if tables don't exist yet");
    } else {
      console.log("✅ Contacts table accessible");
      console.log(`📬 Found ${contacts.length} contact entries`);
    }

    console.log("\n🎉 Supabase connection test completed!");
    console.log(
      "📝 Note: If tables don't exist yet, that's normal for a new database.",
    );
    console.log(
      "   You can create them using the SQL schema provided in the docs.",
    );
  } catch (error) {
    console.error("❌ Supabase connection failed:", error.message);
    console.error(
      "🔧 Please check your .env file and Supabase project settings",
    );
    process.exit(1);
  }
}

// Run the test
testSupabaseConnection();
