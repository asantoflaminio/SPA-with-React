import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PublicationService from '../services/PublicationService'
import * as StatusCode from '../util/StatusCode'
import * as Constants from '../util/Constants'

const PUBLICATIONS_PATH = process.env.PUBLIC_URL + '/meinHaus/publications-management'



describe('getPublicationsTest', () => {
    it('returns OK STATUS', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        const query = {
            operation: "FSale",
            propertyType: "House",
            address: "Test 123",
            minPrice: "3000",
            maxPrice: "5000",
            minFloorSize: "240",
            maxFloorSize: "500",
            bedrooms: "4",
            bathrooms: "3",
            parking: "2",
            order: Constants.NEWEST_PUBLICATION,
            page: "0",
            limit: Constants.PUBLICATIONS_PAGE_LIMIT       
         }
        mock.onGet(PUBLICATIONS_PATH + '/publications').reply(200, data);
        PublicationService.getPublications(query).then(response => {
            expect(response.status).toEqual(StatusCode.OK);
            done();
        });
    });
});

describe('getPublicationTest', () => {
    it('returns OK STATUS', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        let pubId = 4;
        mock.onGet(PUBLICATIONS_PATH + '/publications/' + pubId).reply(200, data);
        PublicationService.getPublication(pubId).then(response => {
            expect(response.status).toEqual(StatusCode.OK);
            done();
        });
    });
});

describe('erasePublicationTest', () => {
    it('returns OK STATUS', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        let pubId = 4;
        mock.onDelete(PUBLICATIONS_PATH + '/publications/' + pubId).reply(200, data);
        PublicationService.erasePublication(pubId).then(response => {
            expect(response.status).toEqual(StatusCode.OK);
            done();
        });
    });
});