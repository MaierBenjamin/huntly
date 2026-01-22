import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskWifiPage } from './task-wifi.page';

describe('TaskWifiPage', () => {
  let component: TaskWifiPage;
  let fixture: ComponentFixture<TaskWifiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskWifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
