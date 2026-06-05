import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  // Nyckel som används för lagring i localStorage
  private storageKey = 'schedule';

  // Array som innehåller användarens valda kurser
  private schedule: Course[] = [];

  constructor() {

    // Läser in sparade kurser när tjänsten startas
    this.loadFromLocalStorage();
  }

  // Returnerar alla kurser i ramschemat
  getSchedule(): Course[] {
    return this.schedule;
  }

  // Lägger till en kurs i ramschemat om den inte redan finns
  addCourse(course: Course): void {

    // Kontrollerar om kursen redan finns i ramschemat
    const exists = this.schedule.some(
      item => item.courseCode === course.courseCode
    );

    // Kursen läggs endast till om den inte redan existerar
    if (!exists) {
      this.schedule.push(course);

      // Sparar uppdaterat ramschema i localStorage
      this.saveToLocalStorage();
    }
  }

  // Tar bort en kurs från ramschemat baserat på kurskod
  removeCourse(courseCode: string): void {

    this.schedule = this.schedule.filter(
      course => course.courseCode !== courseCode
    );

    // Sparar ändringen i localStorage
    this.saveToLocalStorage();
  }

  // Beräknar det totala antalet högskolepoäng i ramschemat
  getTotalPoints(): number {
    return this.schedule.reduce(
      (sum, course) => sum + course.points, 0
    );
  }

  // Sparar ramschemat i localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.schedule)
    );
  }

  // Läser in tidigare sparat ramschema från localStorage
  private loadFromLocalStorage(): void {

    const savedSchedule = localStorage.getItem(this.storageKey);

    // Om data finns sparad läses den in i schedule-arrayen
    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    }
  }
}