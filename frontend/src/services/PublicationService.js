import ErrorService from "./ErrorService";
import axios from 'axios';
import JsonService from './JsonService'
import LocalStorageService from './LocalStorageService'

const PublicationService = (function(){

    const PUBLICATIONS_PATH = process.env.PUBLIC_URL + '/meinHaus/publications-managment'

    async function _getPublications(queryParameters){
      return await axios({
          method: 'get',
          url: `${PUBLICATIONS_PATH}/publications`,
          params: queryParameters,         
          headers: {
            authorization: LocalStorageService.getAuthorization()
          }
      }).then(function (response){ return response }).catch(function (error){ return error.response })
  }

    async function _getPublication(publicationid){
        return await axios({
            method: 'get',
            url: `${PUBLICATIONS_PATH}/publications/${publicationid}`,
            headers: {
              authorization: LocalStorageService.getAuthorization()
            }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getFilters(queryParameters){
        return await axios({
            method: 'get',
            url: `${PUBLICATIONS_PATH}/publications/filters`,
            params:queryParameters
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getImage(publicationid,queryParameters,props){
        return await axios({
            method: 'get',
            url: `${PUBLICATIONS_PATH}/publications/${publicationid}/images`,
            params: queryParameters
          }).then(function (response){ return response }).catch(function (error){ return error.response })     
    }

    async function _postImages(publicationid,dataDTO){
      return await axios({
          method: 'post',
          url: `${PUBLICATIONS_PATH}/publications/${publicationid}/images`,
          data: dataDTO,
          headers: {
              contentType:'multipart/form-data',
              authorization: LocalStorageService.getAuthorization()
            }
        }).then(function (response){ return response }).catch(function (error){ return error.response })     
  }

    async function _isFavourite(array,props){
      return await axios({
        method: 'post',
        url: PUBLICATIONS_PATH + '/isFavourite',
        data: JsonService.getJSONParsed(array),
        headers: {
          authorization: LocalStorageService.getAuthorization()
      }
      })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        ErrorService.logError(props,error)
      });   
    }

    async function _erasePublication(publicationID){
      return await axios({
        method: 'delete',
        url: `${PUBLICATIONS_PATH}/publications/${publicationID}`,
        headers: {
          authorization: LocalStorageService.getAuthorization()
      }
      }).then(function (response){ return response }).catch(function (error){ return error.response }) 
    }

    

    return {
        getPublications : _getPublications,
        getPublication : _getPublication,
        getFilters : _getFilters,
        getImage : _getImage,
        postImages : _postImages,
        isFavourite : _isFavourite,
        erasePublication : _erasePublication
      }
     })();
  
    export default PublicationService;