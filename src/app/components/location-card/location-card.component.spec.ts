import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GetDataService } from '../../services/get-data.service';
import { LocationCardComponent } from './location-card.component';
import {Store} from "@ngrx/store";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {mockLocation} from "../../tests-mocks/tests-mocks";

describe('LocationCardComponent', () => {
    let component: LocationCardComponent;
    let fixture: ComponentFixture<LocationCardComponent>;
    let getDataService: jasmine.SpyObj<GetDataService>;

    beforeEach(async () => {
        const activatedRouteMock = {
            params: of({id: '123'}) // Simulate route param 'id'
        };
        const getDataServiceSpy = jasmine.createSpyObj('GetDataService', ['getLocationInfo']);

        await TestBed.configureTestingModule({
            declarations: [LocationCardComponent],
            imports: [MatProgressBarModule, FavoriteButtonModule, CarouselModule, MatIconModule, RouterTestingModule],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                { provide: GetDataService, useValue: getDataServiceSpy },
                {provide: Store, useValue: {select: () => of([])}},
            ],
        }).compileComponents();

        getDataService = TestBed.inject(GetDataService) as jasmine.SpyObj<GetDataService>;
        fixture = TestBed.createComponent(LocationCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch location info and set isLoading to false', () => {
        getDataService.getLocationInfo.and.returnValue(of(mockLocation));

        fixture.detectChanges(); // Trigger ngOnInit

        expect(component.isLoading).toBe(false);
        expect(component.locationInfo$).toBeTruthy(); // Ensure locationInfo$ observable is set
        component.locationInfo$.subscribe((location) => {
            expect(location).toEqual(mockLocation); // Verify that the fetched location matches the expected location
        });
    });
});
