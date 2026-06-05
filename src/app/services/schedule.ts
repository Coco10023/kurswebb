import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  private storageKey = 'schedule';
  private schedule: Course[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  getSchedule(): Course[] {
    return this.schedule;
  }

  addCourse(course: Course): void {
    const exists = this.schedule.some(
      item => item.courseCode === course.courseCode
    );

    if (!exists) {
      this.schedule.push(course);
      this.saveToLocalStorage();
    }
  }

  removeCourse(courseCode: string): void {
    this.schedule = this.schedule.filter(
      course => course.courseCode !== courseCode
    );

    this.saveToLocalStorage();
  }

  getTotalPoints(): number {
    return this.schedule.reduce(
      (sum, course) => sum + course.points, 0
    );
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.schedule));
  }

  private loadFromLocalStorage(): void {
    const savedSchedule = localStorage.getItem(this.storageKey);

    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    }
  }
}