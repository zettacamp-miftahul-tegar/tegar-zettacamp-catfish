import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulPertamaComponent } from './modul-pertama.component';

describe('ModulPertamaComponent', () => {
  let component: ModulPertamaComponent;
  let fixture: ComponentFixture<ModulPertamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulPertamaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulPertamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
