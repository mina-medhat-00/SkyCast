import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetPath = `${__dirname}/../src/environments/environment.prod.ts`;

const envFileContent = `
export const environment = {
  production: true,
  openWeatherApiKey: '${process.env.NG_OPENWEATHER_API_KEY}',
  huggingfaceToken: '${process.env.NG_HUGGINGFACE_TOKEN}'
} as const;
`;

try {
  await writeFile(targetPath, envFileContent);
  console.log(`environment.prod.ts generated at ${targetPath}`);
} catch (err) {
  console.error(`failed to write environment.prod.ts:`, err);
}
