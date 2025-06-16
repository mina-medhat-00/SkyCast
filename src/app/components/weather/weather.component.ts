import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { WeatherService } from "../../services/weather.service";
import { AiService } from "../../services/ai.service";

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
  loading = false;

  constructor(
    private weatherService: WeatherService,
    private aiService: AiService
  ) {}

  searchWeather() {
    this.error = "";
    this.weatherData = null;
    if (!this.city.trim()) {
      this.error = "City name is required";
      return;
    }

    this.loading = true;
    this.weatherService.getWeatherByCity(this.city.trim()).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: () => {
        this.error = "City not found or API error";
        this.loading = false;
      },
    });
  }

  aiSummary: string = "";
  summarizing = false;

  generateSummary() {
    if (!this.weatherData) return;

    const text = `Weather in ${this.weatherData.name}: 
    Temperature is ${this.weatherData.main.temp}°C, 
    condition is ${this.weatherData.weather[0].description}, 
    wind speed is ${this.weatherData.wind.speed} m/s, 
    humidity is ${this.weatherData.main.humidity}%.`;

    this.summarizing = true;
    this.aiService.summarize(text).subscribe({
      next: (res) => {
        this.aiSummary = res[0]?.summary_text || "Summary not available";
        this.summarizing = false;
      },
      error: () => {
        this.aiSummary = "AI summary failed.";
        this.summarizing = false;
      },
    });
  }
}
