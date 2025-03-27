import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ICelebrity, ICelebrityForm } from '../../interfaces/celebrities.interface';

@Component({
  selector: 'app-celebrities-add-edit-dialog',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatChipsModule,
    MatDatepickerInput,
    MatButtonModule,
    NgClass,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './celebrities-add-edit-dialog.component.html',
  styleUrl: './celebrities-add-edit-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CelebritiesAddEditDialogComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<CelebritiesAddEditDialogComponent>);
  private readonly data = inject<ICelebrity>(MAT_DIALOG_DATA);

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public readonly genders = ['Male', 'Female'];

  public form!: FormGroup<ICelebrityForm>;

  public celebrity = signal<ICelebrity>(this.data ?? {});
  public editorTitle = computed<string>(() => `Edit ${this.celebrity()?.name?.split(' ')?.[0]}`);
  public roles = signal(this.celebrity()?.roles ?? []);
  public currentRole!: WritableSignal<FormControl<string>>;

  public ngOnInit(): void {
    this.initForm();
  }

  public onConfirm(): void {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.celebrity(),
        name: this.form.value.name,
        gender: this.form.value.gender,
        birthDate: this.form.value.birthDate,
        roles: this.form.value.roles,
        info: this.form.value.info,
      });
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.roles.update(fruits => [...fruits, value]);
    }
    this.currentRole().patchValue('');
  }

  public remove(role: string): void {
    this.roles.update(roles => {
      const index = roles.indexOf(role);
      if (index < 0) {
        return roles;
      }
      roles.splice(index, 1);
      return [...roles];
    });
  }

  private initForm(): void {
    this.form = new FormGroup<ICelebrityForm>({
      name: new FormControl<string>(this.celebrity()?.name ?? '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      gender: new FormControl<string>(this.celebrity()?.gender ?? '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      birthDate: new FormControl<Date>(this.celebrity()?.birthDate ?? new Date(), {
        validators: [Validators.required],
        nonNullable: true,
      }),
      roles: new FormControl<string[]>(
        this.celebrity()?.roles ?? [], {
          validators: [Validators.required],
          nonNullable: true,
        }),
      currRole: new FormControl<string>('', { nonNullable: true }),
      info: new FormControl<string>(this.celebrity()?.info ?? '', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
    this.currentRole = signal<FormControl<string>>(this.form.get('currRole') as FormControl);
  }
}
