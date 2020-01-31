import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LocationService from '../../services/LocationService'
import * as StatusCode from '../../util/StatusCode'

const LOCATIONS_PATH = 'meinHaus/locations-management'


it('gets provinces', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);
    mock.onGet(LOCATIONS_PATH + '/provinces').reply(200, 
        {
            provinces: [ "prov1", "prov2", "prov3" ]
        });

    const provinces = await LocationService.getProvinces();

    expect(provinces.data.provinces).toEqual([ "prov1", "prov2", "prov3" ]);
    //expect(spy).toHaveBeenCalled();

})

it('gets cites', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);
    mock.onGet(LOCATIONS_PATH + '/provinces/5/cities').reply(200, 
        {
            cities: [ "city1", "city2", "city3" ]
        });

    const cities = await LocationService.getCities(5);

    expect(cities.data.cities).toEqual([ "city1", "city2", "city3" ]);
    //expect(spy).toHaveBeenCalled();

})

it('gets neighborhoods', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);
    mock.onGet(LOCATIONS_PATH + '/cities/5/neighborhoods').reply(200, 
        {
            neighborhoods: [ "neigh1", "neigh2", "neigh3" ]
        });

    const neighborhoods = await LocationService.getNeighborhoods(5);

    expect(neighborhoods.data.neighborhoods).toEqual([ "neigh1", "neigh2", "neigh3" ]);
    //expect(spy).toHaveBeenCalled();

})

it('posts province', async() => {

    let spy = jest.spyOn(axios, "post");
    var mock = new MockAdapter(axios);
    mock.onPost(LOCATIONS_PATH + '/provinces').reply(StatusCode.OK);

    const provDTO = {
        province: "test",
        provinceId: "123"
    }
    const ans = await LocationService.postProvince(provDTO);

    expect(ans.status).toEqual(StatusCode.OK);
     // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    //expect(spy).toHaveBeenCalled();

})

it('posts city', async() => {

    let spy = jest.spyOn(axios, "post");
    var mock = new MockAdapter(axios);
    mock.onPost(LOCATIONS_PATH + '/provinces/123/cities').reply(StatusCode.OK);

    const cityDTO = {
        city: "test",
        cityId: "123",
        provinceId: "123"
    }
    const ans = await LocationService.postCity(123, cityDTO);

    expect(ans.status).toEqual(StatusCode.OK);
     // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    //expect(spy).toHaveBeenCalled();

})

it('posts neighborhood', async() => {

    let spy = jest.spyOn(axios, "post");
    var mock = new MockAdapter(axios);
    mock.onPost(LOCATIONS_PATH + '/cities/123/neighborhoods').reply(StatusCode.OK);

    const neighDTO = {
        neighborhood: "test",
        neighborhoodId: "123",
        cityId: "123",
        provinceId: "123"
    }
    const ans = await LocationService.postNeighborhood(123, neighDTO);

    expect(ans.status).toEqual(StatusCode.OK);
     // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    //expect(spy).toHaveBeenCalled();

})