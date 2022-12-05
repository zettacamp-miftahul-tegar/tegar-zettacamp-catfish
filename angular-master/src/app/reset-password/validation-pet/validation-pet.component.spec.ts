import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPetComponent } from './validation-pet.component';

describe('ValidationPetComponent', () => {
  let component: ValidationPetComponent;
  let fixture: ComponentFixture<ValidationPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
