import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranskripDosenComponent } from './transkrip-dosen.component';

describe('TranskripDosenComponent', () => {
  let component: TranskripDosenComponent;
  let fixture: ComponentFixture<TranskripDosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranskripDosenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranskripDosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
