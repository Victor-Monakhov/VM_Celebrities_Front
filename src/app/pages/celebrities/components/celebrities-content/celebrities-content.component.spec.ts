import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritiesContentComponent } from './celebrities-content.component';

describe('CelebritiesContentComponent', () => {
  let component: CelebritiesContentComponent;
  let fixture: ComponentFixture<CelebritiesContentComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [CelebritiesContentComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CelebritiesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
