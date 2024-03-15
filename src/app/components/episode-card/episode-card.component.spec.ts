import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {GetDataService} from '../../services/get-data.service';
import {EpisodeCardComponent} from './episode-card.component';
import {mockEpisode} from "../../tests-mocks/tests-mocks";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";
import {Store} from "@ngrx/store";
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('EpisodeCardComponent', () => {
    let component: EpisodeCardComponent;
    let fixture: ComponentFixture<EpisodeCardComponent>;
    let getDataService: jasmine.SpyObj<GetDataService>;

    beforeEach(async () => {
        const getDataServiceSpy = jasmine.createSpyObj('GetDataService', ['getEpisodeInfo']);
        const activatedRouteMock = {
            params: of({id: '123'}) // Simulate route param 'id'
        };
        await TestBed.configureTestingModule({
            declarations: [EpisodeCardComponent],
            imports: [MatProgressBarModule, FavoriteButtonModule, CarouselModule, MatIconModule, RouterTestingModule, BrowserAnimationsModule],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteMock},
                {provide: GetDataService, useValue: getDataServiceSpy},
                {provide: Store, useValue: {select: () => of([])}},
            ],
        }).compileComponents();

        getDataService = TestBed.inject(GetDataService) as jasmine.SpyObj<GetDataService>;
        fixture = TestBed.createComponent(EpisodeCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch episode info and set isLoading to false', () => {
        getDataService.getEpisodeInfo.and.returnValue(of(mockEpisode));

        fixture.detectChanges(); // Trigger ngOnInit

        expect(component.isLoading).toBe(false);
        expect(component.episodeInfo$).toBeTruthy(); // Ensure episodeInfo$ observable is set
        component.episodeInfo$.subscribe((episode) => {
            expect(episode).toEqual(mockEpisode); // Verify that the fetched episode matches the expected episode
        });
    });
});
