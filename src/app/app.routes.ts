import { Routes } from '@angular/router';

import { Courses } from "./pages/courses/courses";
import { Schedule } from "./pages/schedule/schedule";

// Kopplar routing filen till komponenter för att användare ska kunna gå mellan kurslistan och ramschemat. 
export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: Courses },
  { path: 'schedule', component: Schedule }
];
