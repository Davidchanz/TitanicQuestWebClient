import {Component, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../style/themify-icons.css'],
  encapsulation: ViewEncapsulation.None}
)
export class AppComponent {
  title = 'Titanic Quest';
}
