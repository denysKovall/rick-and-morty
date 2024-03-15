import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import { Store, StoreModule } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import {MatMenuModule} from "@angular/material/menu";

describe('AppHeaderComponent', () => {
    let component: AppHeaderComponent;
    let fixture: ComponentFixture<AppHeaderComponent>;
    let store: Store<any>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppHeaderComponent],
            imports: [
                StoreModule.forRoot({}),
                MatMenuModule
            ],
            providers: [
                { provide: Store, useValue: { select: () => of([]) } }, // Mock the Store with a select method
            ],
            schemas: [NO_ERRORS_SCHEMA], // Ignore unknown elements and attributes
        }).compileComponents();

        fixture = TestBed.createComponent(AppHeaderComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set noFavorites$ correctly', () => {
        const mockFavorites = [
            { id: 1, name: 'Character 1' },
            { id: 2, name: 'Character 2' },
        ];

        spyOn(store, 'select').and.returnValue(of(mockFavorites));

        fixture.detectChanges();

        expect(component.noFavorites$).toBeTruthy();
        component.noFavorites$.subscribe((result) => {
            expect(result).toBe(false);
        });
    });
});
