import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  fromEvent,
  map,
  Observable,
  of,
  switchMap,
  tap
} from "rxjs";
import {SearchData} from "../../models/search-data.model";
import {GetDataService} from "../../services/get-data.service";
import {ApolloQueryResult} from "@apollo/client/core";
import {searchIcons, SearchIconType} from "../../icons/icons";
import {Characters} from "../../models/characters.model";
import {Locations} from "../../models/locations.model";
import {Episodes} from "../../models/episodes.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchInput', {static: false}) inputRef!: ElementRef;
  searchData$: Observable<[Characters, Locations, Episodes] | null> = EMPTY;
  readonly maxSearchResults = 10;
  isSearchVisible: boolean = false;
  showSearch = false;
  filters: boolean[] = [true, true, true]; //filters is applied by default
  public readonly icons: SearchIconType = searchIcons;

  constructor(private getDataService: GetDataService, private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.isSearchVisible = false; // we want to listen click outside the search block
    }
  }

  ngAfterViewInit(): void {
    this.searchData$ = fromEvent(this.inputRef.nativeElement, 'input')
      .pipe(
        tap(() => this.isSearchVisible = true),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => {
          const inputValue = this.inputRef.nativeElement.value.trim();
          if (inputValue) {
            return this.getDataService.getSearchResults(inputValue, this.filters).pipe(
              map((data: ApolloQueryResult<SearchData>) => this.extractSearchResults(data)),
              catchError(error => {
                console.error('Error fetching search results:', error);
                return of([]); // or any default value you want to return
              })
            );
          } else {
            return of([]); // No need to make an API call if search input is empty
          }
        })
      ) as Observable<[Characters, Locations, Episodes]>
  }

  private extractSearchResults(data: ApolloQueryResult<SearchData>): (Characters | Locations | Episodes)[] {
    const characters = data.data?.characters?.results as Characters[] || [];
    const locations = data.data?.locations?.results as Locations[] || [];
    const episodes = data.data?.episodes?.results as Episodes[] || [];

    const combinedResults = [...characters, ...locations, ...episodes]; //returning results from api call
    return this.shuffleAndTrimResults(combinedResults);
  }

  private shuffleAndTrimResults(results: (Characters | Locations | Episodes)[]): (Characters | Locations | Episodes)[] {
    return results.sort(() => Math.random() - 0.5).slice(0, this.maxSearchResults); // we are mixing all because we want to show mixed results
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}
