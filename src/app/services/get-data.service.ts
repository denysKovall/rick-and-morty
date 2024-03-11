import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import {GraphqlQueries} from "../graphql-queries";
import {map, Observable} from "rxjs";
import {SearchData} from "../models/search-data.model";
import {ApolloQueryResult} from "@apollo/client/core";
import {Characters} from "../models/character.model";
import {Episodes} from "../models/episodes.model";
import {Locations} from "../models/locations.model";

@Injectable()
export class GetDataService {
  constructor(private apollo: Apollo) {
  }

  public getDataList(query: GraphqlQueries): Observable<ApolloQueryResult<SearchData>> {
    return this.apollo
      .query<SearchData>({
        query: gql(query)
      });
  };

  public getSearchResults(name: string, filters: boolean[]): Observable<ApolloQueryResult<SearchData>> {
    return this.apollo
      .query<SearchData>({
        query: gql(GraphqlQueries.searchQuery), variables: {name: name, includeCharacters: filters[0], includeLocations: filters[1], includeEpisodes: filters[2]}
      })
  };

  public getCharacterInfo(id: string): Observable<Characters> {
    return this.apollo
      .query<{ character: Characters }>({
        query: gql(GraphqlQueries.characterQuery), variables: {id}
      }).pipe(
        map((data: ApolloQueryResult<{ character: Characters }>) => data.data.character)
      )
  };

  public getEpisodeInfo(id: string): Observable<Episodes> {
    return this.apollo
      .query<{ episode: Episodes }>({
        query: gql(GraphqlQueries.episodeQuery), variables: {id}
      }).pipe(
        map((data: ApolloQueryResult<{ episode: Episodes }>) => data.data.episode)
      )
  };

  public getLocationInfo(id: string): Observable<Locations> {
    return this.apollo
      .query<{ location: Locations }>({
        query: gql(GraphqlQueries.locationQuery), variables: {id}
      }).pipe(
        map((data: ApolloQueryResult<{ location: Locations }>) => data.data.location)
      )
  }
}
