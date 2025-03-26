import { ChangeDetectionStrategy, Component, output } from '@angular/core';
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

  showAll = output<void>();
  reset = output<void>();

  onShowAll(): void {
    this.showAll.emit();
  }

  onReset(): void {
    this.reset.emit();
  }

}
