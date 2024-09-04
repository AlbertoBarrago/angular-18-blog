import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, MatToolbar, MatTooltip, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loginService = inject(AuthService);
  utilService = inject(UtilService);
  title = 'SmurtApp';
}
