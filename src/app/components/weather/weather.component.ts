import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { SafeHtml } from "@angular/platform-browser";
import { AiService } from "../../services/ai.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-weather",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./weather.component.html",
})
export class WeatherComponent {
  city: string = "";
  weatherData: any = null;
  error: string = "";
  loading: boolean = false;
  summarizing: boolean = false;
  aiSuggestions: SafeHtml = "";

  constructor(private http: HttpClient, private aiService: AiService) {}

  searchWeather() {
    this.loading = true;
    this.error = "";
    this.weatherData = null;
    this.aiSuggestions = "";

    if (!this.city.trim()) {
      this.error = "Please enter a city name.";
      this.loading = false;
      return;
    }

    this.http
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${environment.openWeatherApiKey}&units=metric`
      )
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.loading = false;
          console.log(
            "WeatherComponent: Weather data fetched:",
            this.weatherData
          );
        },
        error: (err) => {
          console.error("WeatherComponent: Weather API error:", err);
          this.error =
            "Could not fetch weather. Please check the city name and your API key.";
          this.loading = false;
        },
      });
  }

  async getAiSuggestions() {
    if (!this.weatherData) {
      this.aiSuggestions =
        "Please search for weather data first to get AI suggestions.";
      return;
    }

    this.summarizing = true;
    this.aiSuggestions = "";

    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    const currentDay = now.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const prompt = `
      You are a helpful and informative AI weather assistant specializing in providing practical advice.
      Based on the following current weather details for ${
        this.weatherData.name
      }, ${this.weatherData.sys.country} on ${currentDay} at ${currentTime}:

      - **City:** ${this.weatherData.name}
      - **Country Code:** ${this.weatherData.sys.country}
      - **Weather Description:** ${this.weatherData.weather[0].description}
      - **Current Temperature:** ${this.weatherData.main.temp}°C
      - **Feels Like Temperature:** ${this.weatherData.main.feels_like}°C
      - **Min/Max Temperature (Today):** ${
        this.weatherData.main.temp_min
      }°C / ${this.weatherData.main.temp_max}°C
      - **Humidity:** ${this.weatherData.main.humidity}%
      - **Wind Speed:** ${this.weatherData.wind.speed} m/s
      - **Cloudiness:** ${this.weatherData.clouds.all}%
      - **Visibility:** ${this.weatherData.visibility / 1000} km
      - **Sunrise:** ${new Date(
        this.weatherData.sys.sunrise * 1000
      ).toLocaleTimeString()}
      - **Sunset:** ${new Date(
        this.weatherData.sys.sunset * 1000
      ).toLocaleTimeString()}

      Please provide concise and useful suggestions, structured clearly as a markdown list with **bold headings for each main point**, and use nested markdown lists if appropriate for sub-points.

      * **Weather Outlook (Next 24 Hours):** Describe the likely weather for tomorrow based on current conditions.
      * **Recommended Clothing for Today:** Suggest practical clothing suitable for the current temperature and conditions.
      * **Suggested Activities for Today:** List 2-3 activities that fit the current weather. Consider both outdoor and indoor options.
      * **Local Food & Drink Suggestion:** Recommend a specific food or drink common in ${
        this.weatherData.sys.country
      } (or a general suggestion if unsure of local cuisine) that would be enjoyable with this weather.
      * **Concluding Remark:** Provide a short, friendly closing sentence.

      Ensure each point is clear, practical, and directly answers the request.
    `;

    try {
      const result: SafeHtml = await this.aiService.getSuggestions(prompt);
      this.aiSuggestions = result;
    } catch (err) {
      console.error("WeatherComponent: Error generating AI suggestions:", err);
      this.aiSuggestions = "Failed to get AI suggestions. Please try again.";
    } finally {
      this.summarizing = false;
    }
  }
}
