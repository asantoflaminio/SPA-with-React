// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import LocationService from '../services/LocationService'
// import * as StatusCode from '../util/StatusCode'

//     describe('postProvinceTest', () => {
//         it('returns created STATUS', done => {
//             var mock = new MockAdapter(axios);
//             const data = { response: true };
//             mock.onPost('meinHaus/locations-management/provinces').replyOnce(201, data);
//             mock.onPost('meinHaus/locations-management/provinces').reply(409, data);
//             let provinceDTO = {
//                 province: 'Salta',
//                 provinceid: '4'
//             }
//             LocationService.postProvince(provinceDTO).then(response => {
//                 expect(response.status).toEqual(StatusCode.CREATED);
//                 done();
//             });
//             LocationService.postProvince(provinceDTO).then(response => {
//                 expect(response.status).toEqual(StatusCode.CONFLICT);
//                 done();
//             });
//         });
//     });

//     describe('postCityTest', () => {
//         it('returns created STATUS', done => {
//             var mock = new MockAdapter(axios);
//             const data = { response: true };
//             mock.onPost('meinHaus/locations-management/provinces/4/cities').replyOnce(201, data);
//             let cityDTO = {
//                 city: 'Salta',
//                 cityid: '1',
//                 provinceid: '4'
//             }
//             LocationService.postCity(4, cityDTO).then(response => {
//                 expect(response.status).toEqual(StatusCode.CREATED);
//                 done();
//             });
//         });
//     });

//     describe('postNeighborhoodTest', () => {
//         it('returns created STATUS', done => {
//             var mock = new MockAdapter(axios);
//             const data = { response: true };
//             mock.onPost('meinHaus/locations-management/cities/1/neighborhoods').reply(201, data);
//             let neighborhoodDTO = {
//                 neighborhood: 'TestNeighborhood',
//                 neighborhoodid: '1',
//                 cityid: '1',
//                 provinceid: '4'
//             }
//             LocationService.postNeighborhood(1, neighborhoodDTO).then(response => {
//                 expect(response.status).toEqual(StatusCode.CREATED);
//                 done();
//             });
//         });
//     });

//     describe('getProvincesTest', () => {
//         it('returns OK', done => {
//             var mock = new MockAdapter(axios);
//             const data = { response: true };
//             mock.onGet('meinHaus/locations-management/provinces').reply(200, data);
//             LocationService.getProvinces().then(response => {
//                 expect(response.status).toEqual(StatusCode.OK);
//                 done();
//             });
//         });
//     });

//     describe('getCitiesTest', () => {
//         it('returns OK', done => {
//             var mock = new MockAdapter(axios);
//             const data = { response: true };
//             mock.onGet('meinHaus/locations-management/provinces/4/cities').reply(200, data);
//             LocationService.getCities(4).then(response => {
//                 expect(response.status).toEqual(StatusCode.OK);
//                 done();
//             });
//         });
//     });

//     describe('getNeighborhoodsTest', () => {
//         it('returns OK', done => {
//             var mock = new MockAdapter(axios);
//             const data = { response: true };
//             mock.onGet('meinHaus/locations-management/cities/1/neighborhoods').reply(200, data);
//             LocationService.getNeighborhoods(1).then(response => {
//                 expect(response.status).toEqual(StatusCode.OK);
//                 done();
                
//             });
//         });
//     });