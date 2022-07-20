import path from "path";
import axios from "axios";
import dotenv from "dotenv";

// You can remove this if not env variables are used
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Main function
async function main() {
  // Point to the correct endpoint with its payload
  return axios.get("https://google.com");
}

// Run the main script
main().catch(err => {
  console.error(err);
  process.exit(1);
});
