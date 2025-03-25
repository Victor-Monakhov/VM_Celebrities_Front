import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-celebrities-header',
  standalone: true,
  imports: [],
  templateUrl: './celebrities-header.component.html',
  styleUrl: './celebrities-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebritiesHeaderComponent {

}
