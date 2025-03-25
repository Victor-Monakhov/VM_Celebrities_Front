import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CelebritiesHeaderComponent } from './components/celebrities-header/celebrities-header.component';

@Component({
  selector: 'app-celebrities',
  imports: [
    CelebritiesHeaderComponent,
  ],
  templateUrl: './celebrities.component.html',
  styleUrl: './celebrities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebritiesComponent {

}
