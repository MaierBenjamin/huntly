import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskSensorPage } from './task-sensor.page';

describe('TaskSensorPage', () => {
  let component: TaskSensorPage;
  let fixture: ComponentFixture<TaskSensorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
