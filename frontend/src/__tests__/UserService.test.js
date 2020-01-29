import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserService from '../services/UserService'
import * as StatusCode from '../util/StatusCode'

const USERS_PATH = process.env.PUBLIC_URL + '/meinHaus/users-management';

it('gets users', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);
    mock.onGet(USERS_PATH + '/users').reply(200, 
        {
            answer: {
                results: [ "us1", "us2", "us3" ]
            }
        });
    
    let queryParameters =  { page: 0, limit: 3};

    const users = await UserService.getUsers(queryParameters);

    expect(users.status).toEqual(StatusCode.OK);
    expect(users.data.answer.results).toEqual([ "us1", "us2", "us3" ]);
    //expect(spy).toHaveBeenCalled();

    // expect(spy).toHaveBeenCalledWith(
    //     path, {answer: {
    //         publications: [ "pub1", "pub2", "pub3" ]
    //     }});
})

it('checks mail', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);
    mock.onHead(USERS_PATH + '/users/test@mail.com').replyOnce(StatusCode.OK);
    mock.onHead(USERS_PATH + '/users/test@mail.com').reply(StatusCode.NOT_FOUND);

    const check = await UserService.checkEmail('test@mail.com');
    expect(check.status).toEqual(StatusCode.OK);
    
    const check2 = await UserService.checkEmail('test@mail.com');
    expect(check2.status).toEqual(StatusCode.NOT_FOUND);

    //expect(spy).toHaveBeenCalledTimes(2);

})


it('get user', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);

    mock.onGet(USERS_PATH + '/users/123').reply(StatusCode.OK, 
        {
            lastname: "testLastName",
            email: "test@mail.com",
            phoneNumber: "1500000000",
            password: "testPassword"
        });
    
    const user = await UserService.getUser(123);

    expect(user.status).toEqual(StatusCode.OK);
    expect(user.data.lastname).toEqual("testLastName");
    expect(user.data.email).toEqual("test@mail.com");
    expect(user.data.phoneNumber).toEqual("1500000000");
    expect(user.data.password).toEqual("testPassword");

    //expect(spy).toHaveBeenCalledTimes(1);

    // expect to have been called with 123

})

it('get my favourite publications', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);

    mock.onGet(USERS_PATH + '/users/123/favourite-publications').reply(StatusCode.OK, 
        {
            favourites: ['fav1', 'fav2']
        });

    let queryParameters = {
        page: 0,
        limit: 3,
        locked: false
    }
    
    const faves = await UserService.getMyFavoritesPublications(123, queryParameters);

    expect(faves.data.favourites).toEqual(['fav1', 'fav2']);
    //expect(spy).toHaveBeenCalledTimes(2);

    // expect to have been called with
})

it('add favourite', async() => {

    let spy = jest.spyOn(axios, "post");
    var mock = new MockAdapter(axios);

    mock.onPost(USERS_PATH + '/users/123/favourite-publications').reply(StatusCode.OK);
    
    let favDTO = {
        publicationid: 123
    }
    const ans = await UserService.addFavourite(123, favDTO);

    expect(ans.status).toEqual(StatusCode.OK);

    //expect(spy).toHaveBeenCalledTimes(1);

    //expect to have been called with

})


it('remove favourite', async() => {

    let spy = jest.spyOn(axios, "delete");
    var mock = new MockAdapter(axios);

    mock.onDelete(USERS_PATH + '/users/123/favourite-publications/123').reply(StatusCode.OK);
    
    const ans = await UserService.removeFavourite(123, 123);

    expect(ans.status).toEqual(StatusCode.OK);

    //expect(spy).toHaveBeenCalledTimes(1);
    
    //expect to have been called with

})

it('get my publications', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios);

    

    mock.onGet(USERS_PATH + '/users/123/publications').reply(StatusCode.OK, 
        {
            publications: ['pub1', 'pub2']
        });

    let queryParameters = {
        page: 0,
        limit: 3,
        locked: false
    }
    
    const publications = await UserService.getMyPublications(123, queryParameters);

    expect(publications.data.publications).toEqual(['pub1', 'pub2']);
    //expect(spy).toHaveBeenCalledTimes(1);

    // expect to have been called with

})

it('get publication', async() => {

    let spy = jest.spyOn(axios, "get");
    var mock = new MockAdapter(axios); 

    mock.onGet(USERS_PATH + '/users/123/publications/123').reply(StatusCode.OK, 
        {
            publication: "test"
        });

    
    const publication = await UserService.getPublication(123, 123);

    expect(publication.data.publication).toEqual("test");
    //expect(spy).toHaveBeenCalledTimes(1);

    // expect to have been called with

})

it('post publication', async() => {

    let spy = jest.spyOn(axios, "post");
    var mock = new MockAdapter(axios); 

    mock.onPost(USERS_PATH + '/users/123/publications').reply(StatusCode.OK);
    
    let pubDTO = {
        title: "test"
    }
    const ans = await UserService.postPublication(123, pubDTO);

    expect(ans.status).toEqual(StatusCode.OK);
    //expect(spy).toHaveBeenCalledTimes(1);

    // expect to have been called with

})

it('login', async() => {

    let spy = jest.spyOn(axios, "post");
    var mock = new MockAdapter(axios); 

    mock.onPost(USERS_PATH + '/login').reply(StatusCode.OK);

    let loginDTO = {
        email: "test@mail.com",
        password: "testPassword"
    }
    const ans = await UserService.login(loginDTO);

    expect(ans.status).toEqual(StatusCode.OK);
    //expect(spy).toHaveBeenCalledTimes(1);

    // expect to have been called with

})



