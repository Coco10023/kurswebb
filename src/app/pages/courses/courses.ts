import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})

export class Courses implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  searchText: string = '';

  selectedSubject: string = '';

  sortBy: string = 'courseCode';

  get filteredCourses(): Course[] {
    const filtered = this.courses.filter(course => {
      const matchesSearch =
        course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesSubject =
        this.selectedSubject === '' || course.subject === this.selectedSubject;

      return matchesSearch && matchesSubject;
    });

    return filtered.sort((a, b) => {
      if (this.sortBy === 'points') {
        return a.points - b.points;
      }

      return String(a[this.sortBy as keyof Course])
        .localeCompare(String(b[this.sortBy as keyof Course]));
    });
  }

  get subjects(): string[] {
    return [...new Set(this.courses.map(course => course.subject))].sort();
  }
}