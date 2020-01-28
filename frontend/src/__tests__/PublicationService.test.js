import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PublicationService from '../services/PublicationService'
import * as StatusCode from '../util/StatusCode'

const PUBLICATIONS_PATH = process.env.PUBLIC_URL + '/meinHaus/publications-management'

    it('gets publications', async() => {

        let spy = jest.spyOn(axios, "get");
        var mock = new MockAdapter(axios);
        mock.onGet(PUBLICATIONS_PATH + '/publications').reply(200, 
            {
                answer: {
                    publications: [ "pub1", "pub2", "pub3" ]
                }
            });

        let queryParameters = {
            operation: 'FSale'
        }

        const publications = await PublicationService.getPublications(queryParameters);

        expect(publications.data.answer.publications).toEqual([ "pub1", "pub2", "pub3" ]);
        //expect(spy).toHaveBeenCalled();
        let path = PUBLICATIONS_PATH + '/publications';

        // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    })

    it('gets publication', async() => {

        let spy = jest.spyOn(axios, "get");
        var mock = new MockAdapter(axios);
        mock.onGet(PUBLICATIONS_PATH + '/publications/5').reply(200, 
            {
                answer: {
                    publication: [ "testPublication" ]
                }
            });


        const publication = await PublicationService.getPublication(5);

        expect(publication.data.answer.publication).toEqual([ "testPublication" ]);
        //expect(spy).toHaveBeenCalled();
        let path = PUBLICATIONS_PATH + '/publication/5';

        // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    })

    it('gets image', async() => {

        let spy = jest.spyOn(axios, "get");
        var mock = new MockAdapter(axios);
        mock.onGet(PUBLICATIONS_PATH + '/publications/5/images').reply(200, 
            {
                answer: {
                    results: ['try.jpg']
                }
            });


        const image = await PublicationService.getImage(5, 0);

        expect(image.data.answer.results).toEqual(['try.jpg']);
        //expect(spy).toHaveBeenCalled();
        let path = PUBLICATIONS_PATH + '/publication/5/images';

        // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    })

    it('posts image', async() => {

        let spy = jest.spyOn(axios, "get");
        var mock = new MockAdapter(axios);
        mock.onPost(PUBLICATIONS_PATH + '/publications/5/images').reply(StatusCode.OK);
        
        const publication = await PublicationService.postImages(5, 0);

        expect(publication.status).toEqual(StatusCode.OK);
        //expect(spy).toHaveBeenCalled();
        let path = PUBLICATIONS_PATH + '/publication/5/images';

        // expect(spy).toHaveBeenCalledWith(
        //     path, {answer: {
        //         publications: [ "pub1", "pub2", "pub3" ]
        //     }});
    })


