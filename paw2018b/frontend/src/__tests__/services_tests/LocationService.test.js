import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LocationService from '../../services/LocationService'
import * as StatusCode from '../../util/StatusCode'

const LOCATIONS_PATH = 'meinHaus/locations-management'


it('gets provinces', async() => {

    var mock = new MockAdapter(axios);
    mock.onGet(LOCATIONS_PATH + '/provinces').reply(200, 
        {
            provinces: [ "prov1", "prov2", "prov3" ]
        });

    const provinces = await LocationService.getProvinces();
    expect(provinces.data.provinces).toEqual([ "prov1", "prov2", "prov3" ]);

})

it('gets cites', async() => {

    var mock = new MockAdapter(axios);
    mock.onGet(LOCATIONS_PATH + '/provinces/5/cities').reply(200, 
        {
            cities: [ "city1", "city2", "city3" ]
        });

    const cities = await LocationService.getCities(5);
    expect(cities.data.cities).toEqual([ "city1", "city2", "city3" ]);

})

it('gets neighborhoods', async() => {

    var mock = new MockAdapter(axios);
    mock.onGet(LOCATIONS_PATH + '/cities/5/neighborhoods').reply(200, 
        {
            neighborhoods: [ "neigh1", "neigh2", "neigh3" ]
        });

    const neighborhoods = await LocationService.getNeighborhoods(5);
    expect(neighborhoods.data.neighborhoods).toEqual([ "neigh1", "neigh2", "neigh3" ]);

})

it('posts province', async() => {

    var mock = new MockAdapter(axios);
    mock.onPost(LOCATIONS_PATH + '/provinces').reply(StatusCode.OK);

    const provDTO = {
        province: "test",
        provinceId: "123"
    }

    const ans = await LocationService.postProvince(provDTO);
    expect(ans.status).toEqual(StatusCode.OK);

})

it('posts city', async() => {

    var mock = new MockAdapter(axios);
    mock.onPost(LOCATIONS_PATH + '/provinces/123/cities').reply(StatusCode.OK);

    const cityDTO = {
        city: "test",
        cityId: "123",
        provinceId: "123"
    }

    const ans = await LocationService.postCity(123, cityDTO);
    expect(ans.status).toEqual(StatusCode.OK);

})

it('posts neighborhood', async() => {

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

})