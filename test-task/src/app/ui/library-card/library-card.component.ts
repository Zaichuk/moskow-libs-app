import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {LibraryInfo} from '../../store/open-moscow-data.model';

@Component({
  selector: 'app-library-card',
  imports: [],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryCardComponent {

  @Input()
  libraryInfo!: LibraryInfo;
  expand = false;
}
