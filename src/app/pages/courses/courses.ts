import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})

export class Courses implements OnInit {

  // Array som lagrar alla kurser från JSON-filen
  courses: Course[] = [];

  // Injicerar CourseService för att kunna hämta kursdata
  constructor(private courseService: CourseService,
    private scheduleService: ScheduleService
  ) {}

  // Körs när komponenten laddas
  ngOnInit(): void {

    // Hämtar kursdata från CourseService och sparar i courses-arrayen
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  addToSchedule(course: Course): void { 
    this.scheduleService.addCourse(course); 
  }

  // Variabel för sökning på kurskod eller kursnamn
  searchText: string = '';

  // Variabel för valt ämne i dropdown-menyn
  selectedSubject: string = '';

  // Variabel som styr vilken sortering som används
  sortBy: string = 'courseCode';

  // Returnerar filtrerade och sorterade kurser
  get filteredCourses(): Course[] {

    // Filtrerar kurser baserat på söktext och valt ämne
    const filtered = this.courses.filter(course => {

      const matchesSearch =
        course.courseName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        course.courseCode.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesSubject =
        this.selectedSubject === '' || course.subject === this.selectedSubject;

      return matchesSearch && matchesSubject;
    });

    // Sorterar den filtrerade listan
    return filtered.sort((a, b) => {

      // Numerisk sortering för högskolepoäng
      if (this.sortBy === 'points') {
        return a.points - b.points;
      }

      // Alfabetisk sortering för övriga fält
      return String(a[this.sortBy as keyof Course])
        .localeCompare(String(b[this.sortBy as keyof Course]));
    });
  }

  // Hämtar unika ämnen för dropdown-menyn och sorterar dem alfabetiskt
  get subjects(): string[] {
    return [...new Set(this.courses.map(course => course.subject))].sort();
  }
}