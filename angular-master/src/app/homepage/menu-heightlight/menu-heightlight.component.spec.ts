import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeightlightComponent } from './menu-heightlight.component';

describe('MenuHeightlightComponent', () => {
  let component: MenuHeightlightComponent;
  let fixture: ComponentFixture<MenuHeightlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuHeightlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuHeightlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
