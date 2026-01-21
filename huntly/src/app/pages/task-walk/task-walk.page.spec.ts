import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskWalkPage } from './task-walk.page';

describe('TaskWalkPage', () => {
  let component: TaskWalkPage;
  let fixture: ComponentFixture<TaskWalkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskWalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
