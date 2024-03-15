import {TestBed} from '@angular/core/testing';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {QueryParamsService} from './query-params.service';

describe('QueryParamsService', () => {
    let service: QueryParamsService;
    let routerSpy: jasmine.SpyObj<Router>;
    let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

    beforeEach(() => {
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
        const activatedRouteSpyObj = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { queryParams: {} } });

        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: routerSpyObj },
                { provide: ActivatedRoute, useValue: activatedRouteSpyObj }
            ]
        });

        service = TestBed.inject(QueryParamsService);
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    });

    it('should set query params', () => {
        const params: Partial<PageEvent> = { pageIndex: 1, pageSize: 10 };
        service.setQueryParams(params);

        expect(routerSpy.navigate).toHaveBeenCalledWith([], {
            queryParams: {
                size: params.pageSize,
                page: params.pageIndex
            }
        });
    });

    it('should get query params', () => {
        activatedRouteSpy.snapshot.queryParams = {size: 10, page: 1};

        const result = service.getQueryParams();
        const expectedResult = { pageIndex: 1, pageSize: 10 };
        expect(result).toEqual(expectedResult);
    });
});
