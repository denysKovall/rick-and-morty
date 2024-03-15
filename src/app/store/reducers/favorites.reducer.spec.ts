import { initialState, favoritesReducer } from './favorites.reducer';
import { FavoritesAction } from '../actions/favorites.action';
import { Characters } from '../../models/character.model';
import {mockCharacter} from "../../tests-mocks/tests-mocks";

describe('Favorites Reducer', () => {
    it('should add item to favorites', () => {
        const character: Characters = mockCharacter;
        const action = FavoritesAction.addToFavorites({ favorites: character });
        const state = favoritesReducer(initialState, action);

        expect(state.favorites.length).toBe(1);
        expect(state.favorites[0]).toEqual(character);
    });

    it('should remove item from favorites', () => {
        const character: Characters = mockCharacter;
        const initialStateWithCharacters = { ...initialState, favorites: [character] };

        const action = FavoritesAction.removeFromFavorites({ favorites: character });
        const state = favoritesReducer(initialStateWithCharacters, action);

        expect(state.favorites.length).toBe(0);
        expect(state.favorites).not.toContain(character);
    });

    // Add more test cases as needed for different actions and scenarios
});
