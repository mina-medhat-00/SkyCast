import { Component, Input } from "@angular/core";
import { CommonModule, AsyncPipe } from "@angular/common";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  isDarkTheme: boolean = false;
  currentUserDisplayName$: Observable<string | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUserDisplayName$ = this.authService.currentUser$.pipe(
      map((user) => {
        if (user) {
          return user.displayName || user.email || "User";
        }
        return "Guest";
      })
    );
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.setAttribute(
      "data-theme",
      this.isDarkTheme ? "dark" : "light"
    );
    localStorage.setItem("theme", this.isDarkTheme ? "dark" : "light");
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(["/login"]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.isDarkTheme = savedTheme === "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
}
