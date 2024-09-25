import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../../core/features/auth/services/auth.service';
import { UtilService } from '../../../services/util.service';
import { ThemeService } from '../../../services/theme.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    MatTooltip,
    NgIf,
    MatIconButton,
    RouterLink,
    MatButton,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loginService = inject(AuthService);
  utilService = inject(UtilService);
  title = 'SmurtApp';
  isDarkMode!: boolean;
  themeService = inject(ThemeService);

  constructor() {
    this.themeService.readSystemTheme();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
