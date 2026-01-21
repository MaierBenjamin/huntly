import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskboardPage } from './taskboard.page';

describe('TaskboardPage', () => {
  let component: TaskboardPage;
  let fixture: ComponentFixture<TaskboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
