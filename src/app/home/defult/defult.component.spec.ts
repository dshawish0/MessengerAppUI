import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefultComponent } from './defult.component';

describe('DefultComponent', () => {
  let component: DefultComponent;
  let fixture: ComponentFixture<DefultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
