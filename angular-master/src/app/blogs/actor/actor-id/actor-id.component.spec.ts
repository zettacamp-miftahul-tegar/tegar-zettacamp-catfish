import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorIdComponent } from './actor-id.component';

describe('ActorIdComponent', () => {
  let component: ActorIdComponent;
  let fixture: ComponentFixture<ActorIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
