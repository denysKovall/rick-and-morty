import { TestBed } from '@angular/core/testing';
import { PaginatorBase } from './paginator-base.directive';
import { QueryParamsService } from '../services/query-params.service';
import { PageEvent } from '@angular/material/paginator';

describe('PaginatorBase', () => {
    let directive: PaginatorBase;
    let mockQueryParamsService: jasmine.SpyObj<QueryParamsService>;

    beforeEach(() => {
        mockQueryParamsService = jasmine.createSpyObj('QueryParamsService', ['getQueryParams', 'setQueryParams']);
        TestBed.configureTestingModule({
            // Provide both the directive and the service it depends on
            providers: [
                PaginatorBase,
                { provide: QueryParamsService, useValue: mockQueryParamsService },
            ],
        });

        directive = TestBed.inject(PaginatorBase);
    });

    it('should initialize pagination from query parameters', () => {
        mockQueryParamsService.getQueryParams.and.returnValue({ pageSize: 10, pageIndex: 1 });
        directive.ngOnInit();
        expect(directive.pagination.page).toBe(1);
        expect(directive.pagination.size).toBe(10);
        expect(directive.pagination.fromItems).toBe(10); // Assuming the calculation is corrected based on pageIndex starting from 0
        expect(directive.pagination.toItems).toBe(20);
    });
    it('should correctly calculate and set pagination properties', () => {
        directive.getPagined(10, 2); // Assuming pageIndex starts from 0, so this is the third page
        expect(directive.pagination.page).toBe(2);
        expect(directive.pagination.size).toBe(10);
        expect(directive.pagination.fromItems).toBe(20);
        expect(directive.pagination.toItems).toBe(30);
    });
    it('should update query parameters and pagination on page change', () => {
        const pageEvent: PageEvent = {
            pageIndex: 2,
            pageSize: 10,
            length: 100
        };

        directive.onPageChange(pageEvent);

        expect(mockQueryParamsService.setQueryParams).toHaveBeenCalledWith({pageIndex: 2, pageSize: 10});
        expect(directive.pagination.page).toBe(2);
        expect(directive.pagination.size).toBe(10);
        expect(directive.pagination.fromItems).toBe(20);
        expect(directive.pagination.toItems).toBe(30);
    });

});
