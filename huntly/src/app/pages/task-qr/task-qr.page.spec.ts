import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskQrPage } from './task-qr.page';

describe('TaskQrPage', () => {
  let component: TaskQrPage;
  let fixture: ComponentFixture<TaskQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
