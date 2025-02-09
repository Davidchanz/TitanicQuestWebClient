import {Component, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "../component/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../style/themify-icons.css'],
  encapsulation: ViewEncapsulation.None}
)
export class AppComponent {
  title = 'Titanic Quest';
}
