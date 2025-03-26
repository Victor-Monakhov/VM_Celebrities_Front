import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  imports: [],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent {

}
