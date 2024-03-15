import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {FormsModule} from '@angular/forms';
import {BehaviorSubject, of} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';
import {Characters} from '../../models/characters.model';
import {Locations} from '../../models/locations.model';
import {Episodes} from '../../models/episodes.model';
import {GetDataService} from '../../services/get-data.service';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {mockCharacter, mockData, mockEpisode, mockLocation} from "../../tests-mocks/tests-mocks";
import {ElementRef} from "@angular/core";

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let getDataServiceStub: Partial<GetDataService>;
    let elementRefMock: Partial<ElementRef>;

    beforeEach(async () => {
        getDataServiceStub = {
            getSearchResults: jasmine.createSpy('getSearchResults').and.returnValue(of(mockData))
        };
        elementRefMock = {
            nativeElement: document.createElement('div') // Mock nativeElement to contain the search block
        };
        await TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [FormsModule, MatIconModule,
                MatFormFieldModule, MatInputModule,
                BrowserAnimationsModule],
            providers: [{provide: GetDataService, useValue: getDataServiceStub},
                { provide: ElementRef, useValue: elementRefMock }]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear searchData$ when search value is empty', () => {
        component.searchData$ = of([{} as Characters, {} as Locations, {} as Episodes]); // Set some initial data
        component.onSearchChange('');
        component.searchData$.subscribe(data => {
            expect(data).toEqual(null);
        })
    });

    it('should update searchData$ when search value is not empty', () => {
        component.onSearchChange('test');
        expect(getDataServiceStub.getSearchResults).toHaveBeenCalledWith('test', component.filters);
        component.searchData$.subscribe((data) => {
            expect(data).toBeTruthy()
        });
    });

    it('should hide search when clicked outside', () => {
        // Initially, isSearchVisible should be true
        expect(component.isSearchVisible).toBe(true);

        // Mock a click event outside the search block
        const outsideClickEvent = new MouseEvent('click', { bubbles: true });
        document.body.dispatchEvent(outsideClickEvent);

        // Trigger the onClickOutside method
        component.onClickOutside(outsideClickEvent);

        // Assert that isSearchVisible is now false
        expect(component.isSearchVisible).toBe(false);
    });

});
