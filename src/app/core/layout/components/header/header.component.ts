import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { UtilService } from '../../../../shared/services/util.service';
import { ThemeService } from '../../../../shared/services/theme.service';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatTooltip, NgIf, MatIconButton, RouterLink],
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
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
