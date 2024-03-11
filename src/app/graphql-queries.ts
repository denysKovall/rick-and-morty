export enum GraphqlQueries {
  searchQuery = `
  query getSearch($name: String, $includeCharacters: Boolean!, $includeLocations: Boolean!, $includeEpisodes: Boolean!){
  characters(filter: {name: $name}) @include(if: $includeCharacters) {
    results {
      name
      id
    }
  }
  locations(filter: {name: $name})  @include(if: $includeLocations) {
    results {
      name
      id
    }
  }
  episodes(filter: {name: $name}) @include(if: $includeEpisodes) {
    results {
      name
      id
    }
  }
}
  `,
  charactersListQuery = `
  query getCharactersList{
  characters {
    results {
       id
      name
      image
      species
      status
    }
  }
  }`,
  episodesListQuery = `
  query getEpisodesList{
  episodes {
    results {
      name
      id
      episode
      created
      air_date
    }
  }
  }`,
  locationsListQuery = `
  query getLocationsList{
  locations {
    results {
      name
      id
      created
      dimension
      type
    }
  }
  }`,
  characterQuery = `
  query getCharacter($id: ID!){
  character(id: $id){
        id
        name
        species
        status
        type
        gender
        origin{name}
        location {
          name
          id
         }
        image
        episode{
        name
        id
      }
    }
  }
  `,
  episodeQuery = `
   query getEpisode($id: ID!){
   episode(id:$id){
      id
      name
      air_date
      episode
      created
       characters{
        name
        id
        image
      }
    }
   }
  `,
  locationQuery = `
  query getLocation($id: ID!){
  location(id:$id){
      id
      name
      type
      dimension
      residents{
        id
        name
        image
      }
      created
     }
  }
  `
}
