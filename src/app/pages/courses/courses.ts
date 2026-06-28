import { Component, computed, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course';
import { ScheduleService } from '../../services/schedule';
import { Course } from '../../models/course';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {
  private courseService = inject(CourseService);
  private scheduleService = inject(ScheduleService);

  searchText = signal('');
  selectedSubject = signal('');
  sortBy = signal<keyof Course>('courseCode');

  courses = toSignal(this.courseService.getCourses(), {
    initialValue: [] as Course[]
  });

  subjects = computed(() => {
    return [...new Set(this.courses().map(course => course.subject))].sort();
  });

  filteredCourses = computed(() => {
    const search = this.searchText().toLowerCase();
    const subject = this.selectedSubject();
    const sort = this.sortBy();

    const filtered = this.courses().filter(course => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(search) ||
        course.courseCode.toLowerCase().includes(search);

      const matchesSubject =
        subject === '' || course.subject === subject;

      return matchesSearch && matchesSubject;
    });

    return filtered.sort((a, b) => {
      if (sort === 'points') {
        return a.points - b.points;
      }

      return String(a[sort]).localeCompare(String(b[sort]));
    });
  });

  addToSchedule(course: Course): void {
    this.scheduleService.addCourse(course);
  }
}