import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  get isDarkTheme(): boolean {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }
}
