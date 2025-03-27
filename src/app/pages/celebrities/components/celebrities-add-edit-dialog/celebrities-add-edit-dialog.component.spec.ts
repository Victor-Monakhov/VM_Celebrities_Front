import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritiesAddEditDialogComponent } from './celebrities-add-edit-dialog.component';

describe('CelebritiesAddEditDialogComponent', () => {
  let component: CelebritiesAddEditDialogComponent;
  let fixture: ComponentFixture<CelebritiesAddEditDialogComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [CelebritiesAddEditDialogComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CelebritiesAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
