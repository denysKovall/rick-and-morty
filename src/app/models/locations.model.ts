import {Characters} from "./characters.model";

export type Locations = {
  name: string,
  id: string,
  created: string,
  dimension: string,
  type: string,
  residents: Characters[],
  __typename: string,
}
