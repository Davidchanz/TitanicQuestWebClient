import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {Injector} from "@angular/core";
import {injector} from "./config/Injector";

bootstrapApplication(AppComponent, appConfig)
  .then((appRef: { injector: Injector }) => injector(appRef.injector))
  .catch((err) => console.error(err));
