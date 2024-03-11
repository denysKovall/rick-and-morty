import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  setQueryParams(params: Partial<PageEvent>): void {
    this.router.navigate([], {
      queryParams: {
        size: params.pageSize,
        page: params.pageIndex
      }
    })
  }

  getQueryParams(): { pageIndex: number; pageSize: number } {
    const params = this.activatedRoute.snapshot.queryParams;
    return {pageSize: params['size'], pageIndex: params['page']}
  }
}
