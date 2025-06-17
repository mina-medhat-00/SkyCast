import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  loading: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  async register(): Promise<void> {
    this.loading = true;
    this.errorMessage = "";
    this.successMessage = "";

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      this.loading = false;
      return;
    }

    try {
      const userCredential = await this.authService.register(
        this.email,
        this.password
      );
      this.successMessage = "Registration successful! Redirecting to login...";

      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 2000);
    } catch (error: any) {
      this.errorMessage = error;
      console.error("Registration failed:", error);
    } finally {
      this.loading = false;
    }
  }
}
