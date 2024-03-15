import {TestBed} from '@angular/core/testing';
import {ApolloTestingModule, ApolloTestingController} from 'apollo-angular/testing';
import {GetDataService} from './get-data.service';
import {GraphqlQueries} from '../graphql-queries';
import {of} from "rxjs";
import {Apollo} from "apollo-angular";
import stringMatching = jasmine.stringMatching;
import {mockCharacter, mockData, mockEpisode, mockLocation} from "../tests-mocks/tests-mocks";


describe('GetDataService', () => {
    let service: GetDataService;
    let apolloController: ApolloTestingController;
    let apolloMock: Apollo;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApolloTestingModule],
            providers: [GetDataService],
        });
        service = TestBed.inject(GetDataService);
        apolloController = TestBed.inject(ApolloTestingController);
        apolloMock = TestBed.inject(Apollo);
    });

    afterEach(() => {
        apolloController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch characters list', () => {
        // Spy on the query method of Apollo client
        const querySpy = spyOn(apolloMock, 'query').and.returnValue(of(mockData));

        // Call the method under test
        service.getDataList(GraphqlQueries.charactersListQuery).subscribe((result) => {
            // Check if the result matches the expected data
            expect(result).toEqual(mockData);
            // Check if the query method was called with the correct parameters
            expect(querySpy).toHaveBeenCalledWith({
                query: jasmine.any(Object),
            });
        });
    });

    it('should fetch locations list', () => {
        const querySpy = spyOn(apolloMock, 'query').and.returnValue(of(mockData));

        service.getDataList(GraphqlQueries.locationQuery).subscribe((result) => {
            expect(result).toEqual(mockData);
            expect(querySpy).toHaveBeenCalledWith({
                query: jasmine.any(Object),
            });
        });
    });


    it('should fetch episodes info', () => {
        const querySpy = spyOn(apolloMock, 'query').and.returnValue(of(mockData));

        service.getDataList(GraphqlQueries.episodeQuery).subscribe((result) => {
            expect(result).toEqual(mockData);
            expect(querySpy).toHaveBeenCalledWith({
                query: jasmine.any(Object),
            });
        });
    });

    it('should fetch search results', () => {
        const querySpy = spyOn(apolloMock, 'query').and.returnValue(of(mockData));

        service.getSearchResults('name', [true, true, true]).subscribe((result) => {
            expect(result).toEqual(mockData);
            expect(querySpy).toHaveBeenCalledWith({
                query: jasmine.any(Object),
                variables: jasmine.objectContaining({
                    name: 'name',
                    includeCharacters: true,
                    includeLocations: true,
                    includeEpisodes: true,
                }),
            });
        });
    });
    it('should fetch location info', () => {
        const spy = spyOn(service, 'getLocationInfo').and.returnValue(of(mockLocation));
        service.getLocationInfo('1').subscribe((result) => {
            expect(result).toEqual(mockLocation);
            expect(spy).toHaveBeenCalledWith(stringMatching('1'))
        });
    });

    it('should fetch episodes info', () => {
        const spy = spyOn(service, 'getEpisodeInfo').and.returnValue(of(mockEpisode));
        service.getEpisodeInfo('1').subscribe((result) => {
            expect(result).toEqual(mockEpisode);
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('1'))
        });
    });

    it('should fetch character info', () => {
        const spy = spyOn(service, 'getCharacterInfo').and.returnValue(of(mockCharacter));
        service.getCharacterInfo('1').subscribe((result) => {
            expect(result).toEqual(mockCharacter);
            expect(spy).toHaveBeenCalledWith(jasmine.stringMatching('1'))

        });
    });
});
