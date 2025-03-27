import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  MatTableModule,
} from '@angular/material/table';

import { PreloaderComponent } from '../../../../shared/components/preloader/preloader.component';
import { celebrityPropsDescription, ECelebrityProps } from '../../enums/celebrities.enum';
import { ICelebrity } from '../../interfaces/celebrities.interface';
import { CelebrityValuePipe } from '../../pipes/celebrity-value.pipe';

@Component({
  selector: 'app-celebrities-content',
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CelebrityValuePipe,
    NgClass,
    NgOptimizedImage,
    PreloaderComponent,
  ],
  templateUrl: './celebrities-content.component.html',
  styleUrl: './celebrities-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebritiesContentComponent {

  public celebrities = input<ICelebrity[]>([]);
  public loader = input<boolean>(false);
  public removeCelebrity = output<number>();
  public editCelebrity = output<number>();
  public searchCelebrity = output<string>();

  public readonly columnsToDisplay: ECelebrityProps[] = [
    ECelebrityProps.Id,
    ECelebrityProps.Name,
    ECelebrityProps.Gender,
    ECelebrityProps.BirthDate,
    ECelebrityProps.Roles,
    ECelebrityProps.Movie,
  ];
  public columnTitles: { [key in ECelebrityProps]: string } = celebrityPropsDescription;
  public columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  public expandedElement!: ICelebrity | null;

  public isExpanded(element: ICelebrity): boolean {
    return this.expandedElement === element;
  }

  public toggle(element: ICelebrity): void {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  public onRemoveCelebrity(event: MouseEvent, id: number): void {
    event.stopImmediatePropagation();
    this.removeCelebrity.emit(id);
  }

  public onEditCelebrity(event: MouseEvent, id: number): void {
    event.stopImmediatePropagation();
    this.editCelebrity.emit(id);
  }

  public onSearch(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    if (value) {
      this.searchCelebrity.emit(value);
    }
  }
}
