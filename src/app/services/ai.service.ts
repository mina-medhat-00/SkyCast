import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AiService {
  private apiUrl =
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

  constructor(private http: HttpClient) {}

  summarize(text: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.huggingfaceToken}`,
      "Content-Type": "application/json",
    });
    return this.http.post<any>(this.apiUrl, { inputs: text }, { headers });
  }
}
