import { Routes } from "@angular/router";
import { WeatherComponent } from "./components/weather/weather.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

export const routes: Routes = [
  {
    path: "",
    component: WeatherComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
];
