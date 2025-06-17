import { Routes } from "@angular/router";
import { WeatherComponent } from "./components/weather/weather.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

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
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
