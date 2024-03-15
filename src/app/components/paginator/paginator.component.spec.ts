import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from './paginator.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('PaginatorComponent', () => {
    let component: PaginatorComponent;
    let fixture: ComponentFixture<PaginatorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PaginatorComponent],
            imports: [MatPaginatorModule, BrowserAnimationsModule, NoopAnimationsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaginatorComponent);
        component = fixture.componentInstance;
        component.pagination = { page: 1, size: 10, fromItems: 0, toItems: 10 }; // Mock pagination object
        component.pageSizeOptions = [10, 25, 50]; // Mock pageSizeOptions array
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit page event when onPageEvent is called', () => {
        const pageEvent: PageEvent = {
            pageIndex: 2,
            pageSize: 10,
            length: 100,
        };

        // Spy on the emitPageEvent output EventEmitter
        spyOn(component.emitPageEvent, 'emit');

        // Call the onPageEvent method with the simulated page event
        component.onPageEvent(pageEvent);

        // Expect that emitPageEvent.emit has been called with the page event
        expect(component.emitPageEvent.emit).toHaveBeenCalledWith(pageEvent);
    });
});
