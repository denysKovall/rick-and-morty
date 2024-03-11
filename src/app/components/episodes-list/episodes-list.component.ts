import {ChangeDetectionStrategy, Component} from '@angular/core';
import {finalize, map, Observable} from "rxjs";
import {SearchData} from "../../models/search-data.model";
import {GraphqlQueries} from "../../graphql-queries";
import {GetDataService} from "../../services/get-data.service";
import {QueryParamsService} from "../../services/query-params.service";
import {PaginatorBase} from "../../directives/paginator-base.directive";
import {ApolloQueryResult} from "@apollo/client/core";
import {Episodes} from "../../models/episodes.model";


@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodesListComponent extends PaginatorBase {
  isLoading = true;
  episodesList$: Observable<[Episodes] | undefined> = this.dataService.getDataList(GraphqlQueries.episodesListQuery).pipe(
    map((data: ApolloQueryResult<SearchData>) => data.data.episodes?.results),
    finalize(() => this.isLoading = false)
  );

  constructor(private dataService: GetDataService, queryParamsService: QueryParamsService) {
    super(queryParamsService)
  }
}
