import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-celebrities-header',
  imports: [
    MatButton,
  ],
  templateUrl: './celebrities-header.component.html',
  styleUrl: './celebrities-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebritiesHeaderComponent {

}
