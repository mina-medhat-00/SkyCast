import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.css",
})
export class ForgotPasswordComponent {
  email: string = "";
  loading: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  async sendResetLink(): Promise<void> {
    this.loading = true;
    this.errorMessage = "";
    this.successMessage = "";

    try {
      await this.authService.sendPasswordResetEmail(this.email);
      this.successMessage = "Password reset link sent to your email!";
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 3000);
    } catch (error: any) {
      this.errorMessage = error;
      console.error("Password reset failed:", error);
    } finally {
      this.loading = false;
    }
  }
}
