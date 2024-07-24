import { Routes } from '@angular/router';
import {TitanicQuestComponent} from "../component/titanic-quest/titanic-quest.component";
import {HomeComponent} from "../component/home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'passengers', component: TitanicQuestComponent},
];
