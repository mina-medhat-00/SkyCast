import fs from "fs/promises";
import path from "path";

const envPath = path.resolve("src/environments");

await fs.mkdir(envPath, { recursive: true });

const environmentFilePath = path.join(envPath, "environment.prod.ts");

const environmentFileContent = `
export const environment = {
  production: true,
  openWeatherApiKey: "${process.env.NG_OPENWEATHER_API_KEY || ""}",
  googleGeminiApiKey: "${process.env.NG_GEMINI_TOKEN || ""}"
}
`;

try {
  await fs.writeFile(environmentFilePath, environmentFileContent.trim(), {
    encoding: "utf8",
  });
  console.log("environment.prod.ts generated successfully.");
} catch (err) {
  console.error("Failed to write environment.prod.ts:", err);
  process.exit(1);
}
