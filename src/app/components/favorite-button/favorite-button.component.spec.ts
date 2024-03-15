import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { FavoriteButtonComponent } from './favorite-button.component';
import { FavoritesAction } from '../../store/actions/favorites.action';
import { Characters } from '../../models/characters.model';
import { Episodes } from '../../models/episodes.model';
import { Locations } from '../../models/locations.model';
import { State } from '../../store/reducers/favorites.reducer';
import {mockCharacter, mockEpisode, mockLocation} from "../../tests-mocks/tests-mocks";
import {MatIconModule} from "@angular/material/icon";

describe('FavoriteButtonComponent', () => {
    let component: FavoriteButtonComponent;
    let fixture: ComponentFixture<FavoriteButtonComponent>;
    let store: Store<State>;
    const mockFavorites: (Characters | Episodes | Locations)[] = [
        mockCharacter,
        mockEpisode,
        mockLocation
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FavoriteButtonComponent],
            imports: [StoreModule.forRoot({}), MatIconModule], // Provide an empty store for testing
        }).compileComponents();

        fixture = TestBed.createComponent(FavoriteButtonComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        spyOn(store, 'select').and.returnValue({
            pipe: () => ({
                subscribe: (callback: (value: any) => void) => {
                    callback(mockFavorites); // Simulate emitting the mock favorites list
                }
            }),
        } as any); // Mock the store's select method
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should remove item from favorites list if already added', () => {
        // Set up the initial favorites list in the component
        component.favorites = ['Character']; // Assuming mockCharacter is already in favorites

        // Spy on store.dispatch method
        spyOn(store, 'dispatch');

        // Call checkFavorites with the item that is already in favorites
        component.checkFavorites(mockCharacter);

        // Expect that dispatch is called with removeFromFavorites action
        expect(store.dispatch).toHaveBeenCalledWith(
            FavoritesAction.removeFromFavorites({ favorites: mockCharacter })
        );
    });

    it('should add item to favorites list if it is not added', () => {
        // Set up an empty favorites list in the component
        component.favorites = [];

        // Spy on store.dispatch method
        spyOn(store, 'dispatch');

        // Call checkFavorites with an item that is not in favorites
        component.checkFavorites(mockCharacter);

        // Expect that dispatch is not called since item is not in favorites
        expect(store.dispatch).toHaveBeenCalled();
    });


    it('should unsubscribe on component destroy', () => {
        spyOn<any>(component['unsubscribe$'], 'next');
        spyOn<any>(component['unsubscribe$'], 'complete');


        component.ngOnDestroy();

        expect(component['unsubscribe$'].next).toHaveBeenCalled();
        expect(component['unsubscribe$'].complete).toHaveBeenCalled();
    });
});
