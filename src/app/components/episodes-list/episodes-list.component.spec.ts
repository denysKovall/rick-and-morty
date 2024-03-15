import {Action, ActionReducer, StoreModule} from "@ngrx/store";
import {initialState} from "../../store/reducers/favorites.reducer";
import {GetDataService} from "../../services/get-data.service";
import {GraphqlQueries} from "../../graphql-queries";
import {Observable, of} from "rxjs";
import {ApolloQueryResult} from "@apollo/client/core";
import {SearchData} from "../../models/search-data.model";
import {mockData, mockEpisode} from "../../tests-mocks/tests-mocks";
import {EpisodesListComponent} from "./episodes-list.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterTestingModule} from "@angular/router/testing";
import {PaginatorModule} from "../paginator/paginator.module";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {QueryParamsService} from "../../services/query-params.service";

const dummyReducer: ActionReducer<any, Action> = (state = initialState, action: Action) => {
    return state; // Dummy reducer just returns the state
};

// Define an interface for your mock service that extends Partial<GetDataService>
class MockGetDataService implements Partial<GetDataService> {
    getDataList(query: GraphqlQueries): Observable<ApolloQueryResult<SearchData>> {
        return of(mockData);
    }
}

describe('EpisodesListComponent', () => {
    let component: EpisodesListComponent;
    let fixture: ComponentFixture<EpisodesListComponent>;
    let mockDataService: MockGetDataService; // Use the mock service interface

    beforeEach( async() => {
        await TestBed.configureTestingModule({
            declarations: [EpisodesListComponent],
            imports: [MatProgressBarModule, MatPaginatorModule,
                RouterTestingModule, PaginatorModule,
                FavoriteButtonModule, StoreModule.forRoot({favorites: dummyReducer}),
                BrowserAnimationsModule],
            providers: [
                {provide: GetDataService, useClass: MockGetDataService}, // Provide the mock implementation
                QueryParamsService,
            ],
        }).compileComponents();

        mockDataService = TestBed.inject(GetDataService) as MockGetDataService; // Cast to the mock service interface
        fixture = TestBed.createComponent(EpisodesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load episodes list', fakeAsync(() => {

        mockDataService.getDataList(GraphqlQueries.episodesListQuery)

        fixture.detectChanges(); // Initial detection

        tick(); // Wait for async data retrieval
        fixture.detectChanges(); // Detect changes after data is loaded

        expect(component.isLoading).toBeFalse();
        expect(component.episodesList$).toBeTruthy();
        component.episodesList$.subscribe((episodesList) => {
            expect(episodesList).toEqual([mockEpisode]);
        });

        const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
        expect(progressBar).toBeFalsy(); // Progress bar should not be displayed after loading
    }));
})
