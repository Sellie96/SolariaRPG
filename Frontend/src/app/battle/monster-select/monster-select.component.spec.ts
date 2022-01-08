import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterSelectComponent } from './monster-select.component';

describe('MonsterSelectComponent', () => {
  let component: MonsterSelectComponent;
  let fixture: ComponentFixture<MonsterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonsterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
