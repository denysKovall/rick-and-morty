import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {FavoritesListComponent} from './favorites-list.component';
import {Characters} from '../../models/characters.model';
import {Locations} from '../../models/locations.model';
import {Episodes} from '../../models/episodes.model';
import {FavoritesAction} from '../../store/actions/favorites.action';
import {mockCharacter, mockEpisode, mockLocation} from "../../tests-mocks/tests-mocks";

describe('FavoritesListComponent', () => {
    let component: FavoritesListComponent;
    let fixture: ComponentFixture<FavoritesListComponent>;
    let store: Store;
    const mockFavorites: (Characters | Locations | Episodes)[] = [
        mockCharacter,
        mockLocation,
        mockEpisode,
    ];
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FavoritesListComponent],
            imports: [StoreModule.forRoot({})],
            providers: [                                 //
                {provide: Store,
                    useValue: {
                        select: jasmine.createSpy().and.returnValue(of(mockFavorites)),
                        dispatch: jasmine.createSpy()
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FavoritesListComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch favorites list from store', () => {
        component.favorites$.subscribe(favorites => {
            expect(favorites).toEqual(mockFavorites); // Check if the favorites list matches the mock data
        });
    });

    it('should dispatch removeFromFavorites action when removeFromStore is called', () => {
        const itemToRemove: Characters | Locations | Episodes = mockFavorites[0];
        component.removeFromStore(itemToRemove);
        expect(store.dispatch).toHaveBeenCalledWith(
            FavoritesAction.removeFromFavorites({favorites: itemToRemove})
        );
    });
});
