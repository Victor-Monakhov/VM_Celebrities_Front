import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritiesHeaderComponent } from './celebrities-header.component';

describe('CelebritiesHeaderComponent', () => {
  let component: CelebritiesHeaderComponent;
  let fixture: ComponentFixture<CelebritiesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelebritiesHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelebritiesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
