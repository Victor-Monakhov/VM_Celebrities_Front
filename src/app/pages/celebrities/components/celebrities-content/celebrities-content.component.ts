import { NgClass, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  MatTableModule,
} from '@angular/material/table';

import { celebrityPropsDescription, ECelebrityProps } from '../../enums/celebrities.enum';
import { ICelebrity } from '../../interfaces/celebrities.interface';
import { CelebrityValuePipe } from '../../pipes/celebrity-value.pipe';
import {PreloaderComponent} from "../../../../shared/components/preloader/preloader.component";

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

  removeCelebrity = output<number>();
  editCelebrity = output<number>();
  searchCelebrity = output<string>();

  columnsToDisplay: ECelebrityProps[] = [
    ECelebrityProps.Id,
    ECelebrityProps.Name,
    ECelebrityProps.Gender,
    ECelebrityProps.BirthDate,
    ECelebrityProps.Roles,
    ECelebrityProps.Movie,
  ];
  columnTitles: { [key in ECelebrityProps]: string } = celebrityPropsDescription;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];

  celebrities = input<ICelebrity[]>([]);
  loader = input<boolean>(false);

  expandedElement!: ICelebrity | null;

  isExpanded(element: ICelebrity): boolean {
    return this.expandedElement === element;
  }

  toggle(element: ICelebrity): void {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  onRemoveCelebrity(event: MouseEvent, id: number): void {
    event.stopImmediatePropagation();
    this.removeCelebrity.emit(id);
  }

  onEditCelebrity(event: MouseEvent, id: number): void {
    event.stopImmediatePropagation();
    this.editCelebrity.emit(id);
  }

  onSearch(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    if (value) {
      this.searchCelebrity.emit(value);
    }
  }
}
