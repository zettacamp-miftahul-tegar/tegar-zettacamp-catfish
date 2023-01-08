import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDosenProdiComponent } from './list-dosen-prodi.component';

describe('ListDosenProdiComponent', () => {
  let component: ListDosenProdiComponent;
  let fixture: ComponentFixture<ListDosenProdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDosenProdiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDosenProdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
