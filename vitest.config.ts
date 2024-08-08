import dotenv from "dotenv";
import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

dotenv.config();

export default defineConfig({ ...viteConfig });
