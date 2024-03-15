import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Characters} from '../../models/character.model';
import {GetDataService} from '../../services/get-data.service';
import {CharacterCardComponent} from './character-card.component';
import {mockCharacter} from "../../tests-mocks/tests-mocks";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {Store} from "@ngrx/store";
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatIconModule} from "@angular/material/icon";
import {RouterTestingModule} from "@angular/router/testing";
import {FavoriteButtonModule} from "../favorite-button/favorite-button.module";

describe('CharacterCardComponent', () => {
    let component: CharacterCardComponent;
    let fixture: ComponentFixture<CharacterCardComponent>;
    let dataService: jasmine.SpyObj<GetDataService>;
    let activatedRoute: ActivatedRoute;
    beforeEach(async () => {
        const dataServiceSpy = jasmine.createSpyObj('GetDataService', ['getCharacterInfo']);
        const activatedRouteMock = {
            params: of({id: '123'}) // Simulate route param 'id'
        };
        await TestBed.configureTestingModule({
            declarations: [CharacterCardComponent],
            imports: [MatProgressBarModule, FavoriteButtonModule, CarouselModule, MatIconModule, RouterTestingModule],
            providers: [
                {provide: GetDataService, useValue: dataServiceSpy},
                {provide: ActivatedRoute, useValue: activatedRouteMock},
                {provide: Store, useValue: {select: () => of([])}},
            ],
        }).compileComponents();

        dataService = TestBed.inject(GetDataService) as jasmine.SpyObj<GetDataService>;
        activatedRoute = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(CharacterCardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch character info and set isLoading to false', () => {
        const characterInfo$: Observable<Characters> = of(mockCharacter);

        dataService.getCharacterInfo.and.returnValue(characterInfo$);

        fixture.detectChanges(); // Trigger ngOnInit

        expect(component.isLoading).toBe(false);
        expect(component.characterInfo$).toBeDefined();
        component.characterInfo$.subscribe((result) => {
            expect(result).toEqual(mockCharacter);
        });
    });
});
