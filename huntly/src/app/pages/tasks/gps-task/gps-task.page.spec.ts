import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GpsTaskPage } from './gps-task.page';

describe('GpsTaskPage', () => {
  let component: GpsTaskPage;
  let fixture: ComponentFixture<GpsTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
