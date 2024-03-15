import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppHeaderComponent} from "./components/app-header/app-header.component";
import {Action, ActionReducer, StoreModule} from "@ngrx/store";
import {HomeComponent} from "./components/home/home.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {SearchComponent} from "./components/search/search.component";
import {GetDataService} from "./services/get-data.service";
import {Apollo} from "apollo-angular";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {initialState} from "./store/reducers/favorites.reducer";

const dummyReducer: ActionReducer<any, Action> = (state = initialState, action: Action) => {
    return state; // Dummy reducer just returns the state
};
describe('AppComponent', () => {
    beforeEach(async () =>
        await TestBed.configureTestingModule({
            declarations: [AppComponent, AppHeaderComponent, HomeComponent, SearchComponent],
            imports: [StoreModule.forRoot({favorites:dummyReducer}), MatToolbarModule,
                MatButtonModule, MatIconModule,
                MatMenuModule, MatCheckboxModule,
                MatFormFieldModule, RouterTestingModule,
                FormsModule, MatFormFieldModule ],
            providers: [GetDataService, Apollo]
        }).compileComponents());

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'rickandmortyapi'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('rickandmortyapi');
    });
});
