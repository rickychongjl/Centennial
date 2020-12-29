import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShearerComponent } from './shearer.component';

describe('ShearerComponent', () => {
  let component: ShearerComponent;
  let fixture: ComponentFixture<ShearerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShearerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShearerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
