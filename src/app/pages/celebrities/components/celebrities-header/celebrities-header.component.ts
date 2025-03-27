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

  public showAll = output<void>();
  public reset = output<void>();
  public addNew = output<void>();

  public onShowAll(): void {
    this.showAll.emit();
  }

  public onReset(): void {
    this.reset.emit();
  }

  public onAddNew(): void {
    this.addNew.emit();
  }

}
