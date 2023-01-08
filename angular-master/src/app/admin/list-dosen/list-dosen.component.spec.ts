import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDosenComponent } from './list-dosen.component';

describe('ListDosenComponent', () => {
  let component: ListDosenComponent;
  let fixture: ComponentFixture<ListDosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDosenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
