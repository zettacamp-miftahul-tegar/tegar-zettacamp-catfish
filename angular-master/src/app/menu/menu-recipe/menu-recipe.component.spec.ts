import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRecipeComponent } from './menu-recipe.component';

describe('MenuRecipeComponent', () => {
  let component: MenuRecipeComponent;
  let fixture: ComponentFixture<MenuRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
