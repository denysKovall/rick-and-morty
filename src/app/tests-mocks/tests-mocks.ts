import {Characters} from "../models/characters.model";
import {Locations} from "../models/locations.model";
import {Episodes} from "../models/episodes.model";
import {ApolloQueryResult} from "@apollo/client/core";
import {SearchData} from "../models/search-data.model";

export const mockCharacter: Characters = {
    __typename: 'character',
    id: '1',
    image: 'image.jpg',
    name: 'Character',
    species: 'species'
}
export const mockLocation: Locations = {
    id: '1',
    name: 'Location',
    dimension: 'Dimension',
    type: 'Type',
    created: '01.01.24',
    residents: [],
    __typename: 'location'
};
export const mockEpisode: Episodes = {
    id: '1',
    name: 'episode',
    created: '01.01.24',
    episode: 'episode',
    air_date: '01.01.24',
    __typename: 'episodes',
    characters: [mockCharacter]
}

export const mockData: ApolloQueryResult<SearchData> = {
    data: {
        characters: {
            results: [mockCharacter],
            __typename: 'Characters',
        },
        locations: {
            results: [mockLocation],
            __typename: 'Locations',
        },
        episodes: {
            results: [mockEpisode],
            __typename: 'Episodes',
        },
    },
    loading: false,
    networkStatus: 7,
};
