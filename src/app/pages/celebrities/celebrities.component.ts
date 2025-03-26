import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CelebritiesHeaderComponent } from './components/celebrities-header/celebrities-header.component';
import {CelebritiesContentComponent} from "./components/celebrities-content/celebrities-content.component";

@Component({
  selector: 'app-celebrities',
  imports: [
    CelebritiesHeaderComponent,
    CelebritiesContentComponent,
  ],
  templateUrl: './celebrities.component.html',
  styleUrl: './celebrities.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebritiesComponent {

}
