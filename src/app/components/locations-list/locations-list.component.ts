import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PaginatorBase} from "../../directives/paginator-base.directive";
import {finalize, map, Observable} from "rxjs";
import {SearchData} from "../../models/search-data.model";
import {GraphqlQueries} from "../../graphql-queries";
import {ApolloQueryResult} from "@apollo/client/core";
import {GetDataService} from "../../services/get-data.service";
import {QueryParamsService} from "../../services/query-params.service";
import {Locations} from "../../models/locations.model";

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsListComponent extends PaginatorBase {
  isLoading = true;
  locationsList$: Observable<[Locations] | undefined> = this.dataService.getDataList(GraphqlQueries.locationsListQuery).pipe(
    map((characters: ApolloQueryResult<SearchData>) => characters?.data?.locations?.results),
    finalize(() => this.isLoading = false),
  );

  constructor(private dataService: GetDataService, queryParamsService: QueryParamsService) {
    super(queryParamsService)
  }
}
