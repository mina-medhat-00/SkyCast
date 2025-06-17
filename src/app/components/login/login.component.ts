import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  loading: boolean = false;
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    this.loading = true;
    this.errorMessage = "";

    try {
      const userCredential = await this.authService.login(
        this.email,
        this.password
      );
      this.router.navigate(["/"]);
    } catch (error: any) {
      this.errorMessage = error;
      console.error("Login failed:", error);
    } finally {
      this.loading = false;
    }
  }
}
