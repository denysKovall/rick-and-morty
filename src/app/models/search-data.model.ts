import {Characters} from "./characters.model";
import {Locations} from "./locations.model";
import {Episodes} from "./episodes.model";

export type SearchData = {
  characters?: {
    results: [Characters],
    __typename: string,
  } ,
  locations?: {
    results: [Locations],
    __typename: string,
  } ,
  episodes?: {
    results: [Episodes],
    __typename: string,
  } ,
}
