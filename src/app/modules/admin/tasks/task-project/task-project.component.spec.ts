import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskProjectsComponent } from './task-project.component';



describe('TaskListComponent', () => {
  let component: TaskProjectsComponent;
  let fixture: ComponentFixture<TaskProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskProjectsComponent]
    });
    fixture = TestBed.createComponent(TaskProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
