import {Directive, OnInit} from "@angular/core";
import {Pagination} from "../models/pagination";
import {QueryParamsService} from "../services/query-params.service";
import {PageEvent} from "@angular/material/paginator";


@Directive()
export class PaginatorBase implements OnInit {

  pagination: Pagination = {
    page: 0,
    size: 5,
    fromItems: 0,
    toItems: 5
  }

  constructor(public queryParamsService: QueryParamsService) {
  }

  ngOnInit(): void {
    const params = this.queryParamsService.getQueryParams(); // checking page params if user went to current page
    const pageSize = +params?.pageSize;
    const pageIndex = +params?.pageIndex;

    if (pageSize && pageIndex) {
      this.getPagined(pageSize, pageIndex);
    }
  }

  getPagined(pageSize: number, pageIndex: number): void { // setting current params
    this.pagination.page = pageIndex;
    this.pagination.size = pageSize;
    let s = pageSize;
    let i = pageIndex;
    this.pagination.fromItems = s * i;
    i = pageIndex + 1;
    this.pagination.toItems = s * i;
  }

  public onPageChange(e: PageEvent): void {
    this.queryParamsService.setQueryParams({pageIndex: e.pageIndex, pageSize: e.pageSize});
    this.getPagined(e.pageSize, e.pageIndex);
  }
}
