import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.setAttribute(
      "data-theme",
      this.isDarkTheme ? "dark" : "light"
    );
    localStorage.setItem("theme", this.isDarkTheme ? "dark" : "light");
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem("theme") || "light";
    this.isDarkTheme = savedTheme === "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
}
