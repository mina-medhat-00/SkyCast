import fs from "fs/promises";
import path from "path";

const envPath = path.resolve("src/environments");

await fs.mkdir(envPath, { recursive: true });

const environmentFilePath = path.join(envPath, "environment.prod.ts");

const environmentFileContent = `
export const environment = {
  production: true,
  openWeatherApiKey: "${process.env.NG_OPENWEATHER_API_KEY || ""}",
  googleGeminiApiKey: "${process.env.NG_GEMINI_TOKEN || ""}",
  firebase: {
    apiKey: "AIzaSyBG-f1X0xpw8F_Guma9dTSbv5KWz-3jS5c",
    authDomain: "skycast-b8d15.firebaseapp.com",
    projectId: "skycast-b8d15",
    storageBucket: "skycast-b8d15.firebasestorage.app",
    messagingSenderId: "313041843238",
    appId: "1:313041843238:web:e0be4c7ad8bfc955c162e7",
  },
}
`;

try {
  await fs.writeFile(environmentFilePath, environmentFileContent.trim(), {
    encoding: "utf8",
  });
  console.log("environment.prod.ts generated successfully.");
} catch (err) {
  console.error("failed to write environment.prod.ts:", err);
  process.exit(1);
}
