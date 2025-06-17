import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";
import { marked } from "marked";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class AiService {
  private modelId = "gemini-1.5-flash-latest";
  private apiUrl: string;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelId}:generateContent?key=${environment.googleGeminiApiKey}`;

    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }

  async getSuggestions(prompt: string): Promise<SafeHtml> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.9,
        topK: 40,
      },
    };

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, body, { headers })
      );

      let generatedHtml: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(
        "AI response could not be extracted or was empty. Please try again."
      );

      if (response && response.candidates && response.candidates.length > 0) {
        const firstCandidate = response.candidates[0];
        if (
          firstCandidate.content &&
          firstCandidate.content.parts &&
          firstCandidate.content.parts.length > 0
        ) {
          const firstPart = firstCandidate.content.parts[0];
          if (firstPart.text) {
            const rawText = firstPart.text.trim();
            const parsedHtmlString = marked.parse(rawText) as string;
            generatedHtml =
              this.sanitizer.bypassSecurityTrustHtml(parsedHtmlString);
          }
        } else {
          console.warn(
            'AI Service: Gemini candidate found, but "content" or "parts" are missing or empty.',
            firstCandidate
          );
        }
      } else if (response && response.promptFeedback) {
        generatedHtml = this.sanitizer.bypassSecurityTrustHtml(
          "AI could not process the prompt due to safety guidelines or content policies. Please rephrase."
        );
      } else {
        console.warn(
          "AI Service: Gemini API: Response structure is missing candidates or is empty:",
          response
        );
      }

      return generatedHtml;
    } catch (err: any) {
      console.error("AI Service: API error during call to Gemini:", err);
      if (err.status) {
        console.error(`AI Service: HTTP Status: ${err.status}`);
        console.error(
          `AI Service: Error Response Body:`,
          JSON.stringify(err.error, null, 2)
        );
      } else {
        console.error("AI Service: Network or client-side error:", err.message);
      }
      return this.sanitizer.bypassSecurityTrustHtml(
        "Failed to get AI suggestions due to an error. Please check console for details."
      );
    }
  }
}
