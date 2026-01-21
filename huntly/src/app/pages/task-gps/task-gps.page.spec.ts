import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskGpsPage } from './task-gps.page';

describe('TaskGpsPage', () => {
  let component: TaskGpsPage;
  let fixture: ComponentFixture<TaskGpsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
