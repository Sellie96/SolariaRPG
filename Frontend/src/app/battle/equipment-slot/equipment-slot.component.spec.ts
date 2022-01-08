import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSlotComponent } from './equipment-slot.component';

describe('EquipmentSlotComponent', () => {
  let component: EquipmentSlotComponent;
  let fixture: ComponentFixture<EquipmentSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
