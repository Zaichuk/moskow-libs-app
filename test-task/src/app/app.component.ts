import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LibrariesComponent} from './ui/libraries/libraries.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LibrariesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  title = 'test-task';
}
