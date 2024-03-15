import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {LocationsListComponent} from './locations-list.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {GetDataService} from '../../services/get-data.service';
import {QueryParamsService} from '../../services/query-params.service';
import {ApolloQueryResult} from '@apollo/client/core';
import {GraphqlQueries} from "../../graphql-queries";
import {mockData, mockLocation} from "../../tests-mocks/tests-mocks";
import {Action, ActionReducer, StoreModule} from "@ngrx/store";
import {initialState} from "../../store/reducers/favorites.reducer";
import {SearchData} from "../../models/search-data.model";
import {PaginatorModule} from "../paginator/paginator.module";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";
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


describe('LocationsListComponent', () => {
    let component: LocationsListComponent;
    let fixture: ComponentFixture<LocationsListComponent>;
    let mockDataService: MockGetDataService; // Use the mock service interface

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocationsListComponent],
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
        fixture = TestBed.createComponent(LocationsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch locations list and set isLoading to false', fakeAsync(() => {

        mockDataService.getDataList(GraphqlQueries.locationsListQuery)

        fixture.detectChanges(); // Initial detection

        tick(); // Wait for async data retrieval
        fixture.detectChanges(); // Detect changes after data is loaded

        expect(component.isLoading).toBeFalse();
        expect(component.locationsList$).toBeTruthy();
        component.locationsList$.subscribe((locationsList) => {
            expect(locationsList).toEqual([mockLocation]);
        });

        const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
        expect(progressBar).toBeFalsy(); // Progress bar should not be displayed after loading
    }));
});
