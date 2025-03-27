import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';

import { catchError, debounceTime, EMPTY, exhaustMap, filter, Subject, switchMap } from 'rxjs';

import { CelebritiesAddEditDialogComponent } from './components/celebrities-add-edit-dialog/celebrities-add-edit-dialog.component';
import { CelebritiesContentComponent } from './components/celebrities-content/celebrities-content.component';
import { CelebritiesHeaderComponent } from './components/celebrities-header/celebrities-header.component';
import { ICelebrity } from './interfaces/celebrities.interface';
import { CelebritiesService } from './services/celebrities.service';

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
export class CelebritiesComponent implements OnInit {

  private readonly celebritiesService = inject(CelebritiesService);
  private readonly dialog = inject(MatDialog);
  private readonly dr = inject(DestroyRef);

  private allCelebrities$ = new Subject<boolean>();
  private removeCelebrity$ = new Subject<number>();
  private editCelebrity$ = new Subject<number>();
  private addCelebrity$ = new Subject<void>();
  private searchCelebrity$ = new Subject<string>();

  public celebrities = signal<ICelebrity[]>([]);
  public loader = signal<boolean>(false);

  public ngOnInit(): void {
    this.observeAllCelebrities();
    this.observeRemoveCelebrity();
    this.observeSearchCelebrity();
    this.observeEditCelebrity();
    this.observeAddCelebrity();
  }

  public onShowAll(): void {
    this.allCelebrities$.next(false);
  }

  public onReset(): void {
    this.allCelebrities$.next(true);
  }

  public onAddCelebrity(): void {
    this.addCelebrity$.next();
  }

  public onRemoveCelebrity(id: number): void {
    this.removeCelebrity$.next(id);
  }

  public onEditCelebrity(id: number): void {
    this.editCelebrity$.next(id);
  }

  public onSearchCelebrity(name: string): void {
    this.searchCelebrity$.next(name);
  }

  private observeAllCelebrities(): void {
    this.allCelebrities$.pipe(
      filter(() => !this.loader()),
      debounceTime(300),
      exhaustMap(isReset => {
        this.loader.set(true);
        return this.celebritiesService.getAllCelebrities(isReset);
      }),
      catchError(() => {
        this.loader.set(false);
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(celebrities => {
      this.celebrities.set(celebrities);
      this.loader.set(false);
    });
  }

  private observeRemoveCelebrity(): void {
    this.removeCelebrity$.pipe(
      debounceTime(300),
      filter(() => !this.loader()),
      exhaustMap(id => {
        this.loader.set(true);
        return this.celebritiesService.removeCelebrity(id);
      }),
      catchError(() => {
        this.loader.set(false);
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(celebrities => {
      this.celebrities.set(celebrities);
      this.loader.set(false);
    });
  }

  private observeSearchCelebrity(): void {
    this.searchCelebrity$.pipe(
      debounceTime(300),
      filter(() => !this.loader()),
      switchMap(name => {
        this.loader.set(true);
        return this.celebritiesService.searchCelebrity(name);
      }),
      catchError(() => {
        this.loader.set(false);
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(celebrities => {
      this.celebrities.set(celebrities);
      this.loader.set(false);
    });
  }

  private observeEditCelebrity(): void {
    this.editCelebrity$.pipe(
      filter(() => !this.loader()),
      switchMap(id => this.dialog.open(CelebritiesAddEditDialogComponent, {
        data: this.celebrities().find(celebrity => celebrity.id === id),
        hasBackdrop: true,
        panelClass: 'celebrities-dialog',
      }).afterClosed()),
      filter(celebrity => !!celebrity),
      switchMap(celebrity => {
        this.loader.set(true);
        return this.celebritiesService.editCelebrity(celebrity);
      }),
      catchError(() => {
        this.loader.set(false);
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(celebrities => {
      this.celebrities.set(celebrities);
      this.loader.set(false);
    });
  }

  private observeAddCelebrity(): void {
    this.addCelebrity$.pipe(
      filter(() => !this.loader()),
      switchMap(() => this.dialog.open(CelebritiesAddEditDialogComponent, {
        data: null,
        hasBackdrop: true,
        panelClass: 'celebrities-dialog',
      }).afterClosed()),
      filter(celebrity => !!celebrity),
      switchMap(celebrity => {
        this.loader.set(true);
        return this.celebritiesService.addCelebrity(celebrity);
      }),
      catchError(() => {
        this.loader.set(false);
        return EMPTY;
      }),
      takeUntilDestroyed(this.dr),
    ).subscribe(celebrities => {
      this.celebrities.set(celebrities);
      this.loader.set(false);
    });
  }
}
