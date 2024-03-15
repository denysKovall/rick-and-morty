import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
} from '@angular/core';
import {
    catchError,
    EMPTY,
    map,
    Observable,
    of,
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
export class SearchComponent {
    searchData$: Observable<[Characters, Locations, Episodes] | null> = EMPTY;
    readonly maxSearchResults = 10;
    isSearchVisible: boolean = true;
    showSearch = false;
    search!: string;
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

    toggleSearch(): void {
        this.showSearch = !this.showSearch;
    }

    onSearchChange(value: string): void {
        // Only perform search if value is not empty
        if (value.trim()) {
            this.searchData$ = this.getDataService.getSearchResults(value, this.filters).pipe(
                map((data: ApolloQueryResult<SearchData>) => this.processSearchResults(data)),
                tap(() => this.isSearchVisible = true),
                catchError(error => {
                    console.error('Error fetching search results:', error);
                    return of(null);
                })
            );
        } else {
            this.clearSearchData();
        }
    }

    private processSearchResults(data: ApolloQueryResult<SearchData>): [Characters, Locations, Episodes] {
        const characters = (data.data?.characters?.results as Characters[]) || [];
        const locations = (data.data?.locations?.results as Locations[]) || [];
        const episodes = (data.data?.episodes?.results as Episodes[]) || [];

        const combinedResults = [...characters, ...locations, ...episodes]
            .sort(() => Math.random() - 0.5)
            .slice(0, this.maxSearchResults);

        return combinedResults as [Characters, Locations, Episodes];
    }

    private clearSearchData(): void {
        this.searchData$ = of(null); // Clear searchData$ when search value is empty
    }
}
