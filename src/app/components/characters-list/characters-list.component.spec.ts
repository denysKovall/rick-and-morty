import {Observable, of} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {mockCharacter, mockData} from '../../tests-mocks/tests-mocks';
import {CharactersListComponent} from "./characters-list.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {QueryParamsService} from "../../services/query-params.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterTestingModule} from "@angular/router/testing";
import {GetDataService} from "../../services/get-data.service";
import {SearchData} from "../../models/search-data.model";
import {GraphqlQueries} from "../../graphql-queries";
import {PaginatorModule} from "../paginator/paginator.module";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";
import {Action, ActionReducer, StoreModule} from "@ngrx/store";
import {initialState} from "../../store/reducers/favorites.reducer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const dummyReducer: ActionReducer<any, Action> = (state = initialState, action: Action) => {
    return state; // Dummy reducer just returns the state
};

// Define an interface for your mock service that extends Partial<GetDataService>
class MockGetDataService implements Partial<GetDataService> {
    getDataList(query: GraphqlQueries): Observable<ApolloQueryResult<SearchData>> {
        return of(mockData);
    }
}

describe('CharactersListComponent', () => {
    let component: CharactersListComponent;
    let fixture: ComponentFixture<CharactersListComponent>;
    let mockDataService: MockGetDataService; // Use the mock service interface

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CharactersListComponent],
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
        fixture = TestBed.createComponent(CharactersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load characters list', fakeAsync(() => {

        mockDataService.getDataList(GraphqlQueries.charactersListQuery)

        fixture.detectChanges(); // Initial detection

        tick(); // Wait for async data retrieval
        fixture.detectChanges(); // Detect changes after data is loaded

        expect(component.isLoading).toBeFalse();
        expect(component.charactersList$).toBeTruthy();
        component.charactersList$.subscribe((charactersList) => {
            expect(charactersList).toEqual([mockCharacter]);
        });

        const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
        expect(progressBar).toBeFalsy(); // Progress bar should not be displayed after loading
    }));

    it('should handle pagination changes', () => {
        const pageSize = 5;
        const pageIndex = 1;
        const event = {pageSize, pageIndex} as any;
        spyOn(component, 'getPagined');
        spyOn(component.queryParamsService, 'setQueryParams').and.callThrough();
        component.onPageChange(event);

        expect(component.queryParamsService.setQueryParams).toHaveBeenCalledWith({
            pageIndex,
            pageSize,
        });
        expect(component.getPagined).toHaveBeenCalledWith(pageSize, pageIndex);
    });
});
