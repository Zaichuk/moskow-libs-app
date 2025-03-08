import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {OpenMoscowDataService} from '../../store/open-moscow-data.service';
import {LibraryInfo} from '../../store/open-moscow-data.model';
import {BehaviorSubject, Observable, ReplaySubject, Subject, takeUntil} from 'rxjs';
import {AsyncPipe, NgStyle} from '@angular/common';
import {LibraryCardComponent} from '../library-card/library-card.component';
import {TextSelectionDirective} from '../../store/text-selection.directive';

@Component({
  selector: 'app-libraries',
  imports: [
    AsyncPipe,
    LibraryCardComponent,
    TextSelectionDirective
  ],
  templateUrl: './libraries.component.html',
  styleUrl: './libraries.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibrariesComponent implements OnInit, OnDestroy{
  private _onDestroy$ = new ReplaySubject(1);
  private _filteredLibraryInfo$ = new BehaviorSubject<LibraryInfo[]>([]);
  protected fullLibraryInfo: LibraryInfo[] = [];
  @ViewChild('inputSearch') inputSearch?: ElementRef;

  get filteredLibraryInfo$(): Observable<LibraryInfo[]> {
    return this._filteredLibraryInfo$.asObservable();
  }

  constructor(private _openMoscowData: OpenMoscowDataService, private _cdr: ChangeDetectorRef) {}

  getLibraries(): void {
    if (this.inputSearch) {
      const inputSearchValue = (this.inputSearch.nativeElement as HTMLInputElement).value;

      this._filteredLibraryInfo$.next(this.fullLibraryInfo.filter(info => info.Cells.FullName.includes(inputSearchValue)));
    }
  }

  ngOnInit(): void {
    this._openMoscowData.getLibraryTable$().pipe(takeUntil(this._onDestroy$)).subscribe(libraryInfo => {
      this.fullLibraryInfo = libraryInfo;

      this._cdr.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }
}
