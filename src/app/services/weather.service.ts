import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private apiKey = "276bba76c9cd9cb17950f52e45036fdd";
  private apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<any> {
    const params = new HttpParams()
      .set("q", city)
      .set("appid", this.apiKey)
      .set("units", "metric");

    return this.http.get(this.apiUrl, { params });
  }
}
