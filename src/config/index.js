import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// path to your .env file
const loadPath = path.join(__dirname, ".env");
// Local config loader
const dontenvResult = dotenv.config({ silent: false, path: loadPath });

if (dontenvResult.error) {
  throw dontenvResult.error;
}

export default dontenvResult.parsed;
