import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {finalize, map, Observable} from "rxjs";
import {GetDataService} from "../../services/get-data.service";
import {GraphqlQueries} from "../../graphql-queries";
import {SearchData} from "../../models/search-data.model";
import {QueryParamsService} from "../../services/query-params.service";
import {PaginatorBase} from "../../directives/paginator-base.directive";
import {ApolloQueryResult} from "@apollo/client/core";
import {Characters} from "../../models/characters.model";


@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersListComponent extends PaginatorBase implements OnInit {
  isLoading = true;

  charactersList$: Observable<[Characters] | undefined> = this.dataService.getDataList(GraphqlQueries.charactersListQuery).pipe(
    map((characters: ApolloQueryResult<SearchData>) => characters?.data?.characters?.results),
    finalize(() => this.isLoading = false)
  );

  constructor(private dataService: GetDataService, queryParamsService: QueryParamsService) {
    super(queryParamsService)
  }

  override ngOnInit() {
    super.ngOnInit();
  }
}
