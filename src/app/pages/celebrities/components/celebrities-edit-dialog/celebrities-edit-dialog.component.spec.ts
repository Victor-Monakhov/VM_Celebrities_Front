import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritiesEditDialogComponent } from './celebrities-edit-dialog.component';

describe('CelebritiesEditDialogComponent', () => {
  let component: CelebritiesEditDialogComponent;
  let fixture: ComponentFixture<CelebritiesEditDialogComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [CelebritiesEditDialogComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CelebritiesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
