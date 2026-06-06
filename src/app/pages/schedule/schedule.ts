import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {
  constructor(private scheduleService: ScheduleService) {}

  get schedule(): Course[] {
    return this.scheduleService.getSchedule();
  }

  get totalPoints(): number {
    return this.scheduleService.getTotalPoints();
  }

  removeCourse(courseCode: string): void {
    this.scheduleService.removeCourse(courseCode);
  }
}