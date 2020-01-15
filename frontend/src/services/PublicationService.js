import ErrorService from "./ErrorService";
import axios from 'axios';
import JsonService from './JsonService'
import LocalStorageService from './LocalStorageService'

const PublicationService = (function(){

    const PUBLICATIONS_PATH = process.env.PUBLIC_URL + '/meinHaus/publications-managment'

    async function _getPublications(queryParameters,props){
      return await axios({
          method: 'get',
          url: `${PUBLICATIONS_PATH}/publications`,
          params: queryParameters
        })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
          ErrorService.logError(props,error)
        });
  }

    async function _getPublication(array, props){
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + '/getPublicationByID',
            data: JsonService.getJSONParsed(array)
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getFilters(query, props){
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + '/getFilters',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getImage(array,props){
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + '/getPublicationImage',
            data: JsonService.getJSONParsed(array)
          })
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });       
    }

    async function _isFavourite(array,props){
      return await axios({
        method: 'post',
        url: PUBLICATIONS_PATH + '/isFavourite',
        data: JsonService.getJSONParsed(array),
        headers: {
          authorization: LocalStorageService.getAccessToken(),
      }
      })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        ErrorService.logError(props,error)
      });   
    }

    async function _erasePublication(publicationID,props){
      return await axios({
        method: 'delete',
        url: `${PUBLICATIONS_PATH}/publications/${publicationID}`,
        headers: {
          authorization: LocalStorageService.getAccessToken(),
      }
      })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        ErrorService.logError(props,error)
      });   
    }

    

    return {
        getPublications : _getPublications,
        getPublication : _getPublication,
        getFilters : _getFilters,
        getImage : _getImage,
        isFavourite : _isFavourite,
        erasePublication : _erasePublication
      }
     })();
  
    export default PublicationService;