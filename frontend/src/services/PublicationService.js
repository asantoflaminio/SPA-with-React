import axios from 'axios';
import * as ResourcesVersions from '../util/ResourcesVersions'
import LocalStorageService from './LocalStorageService'
import CancelTokenService from './CancelRequestService';

const PublicationService = (function(){

    const PUBLICATIONS_PATH = process.env.PUBLIC_URL + '/meinHaus/publications-management'

    async function _getPublications(queryParameters){
      return await axios({
          method: 'get',
          url: `${PUBLICATIONS_PATH}/publications`,
          cancelToken: CancelTokenService.getSource().token,
          params: queryParameters,
          headers: {
            authorization: LocalStorageService.getAuthorization(),
            'Accept': ResourcesVersions.PUBLICATION
          }
      }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
  }

    async function _getPublication(publicationid){
        return await axios({
            method: 'get',
            url: `${PUBLICATIONS_PATH}/publications/${publicationid}`,
            cancelToken: CancelTokenService.getSource().token,
            headers: {
              authorization: LocalStorageService.getAuthorization(),
              'Accept': ResourcesVersions.PUBLICATION
            }
        }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }

    async function _getFilters(queryParameters){
        return await axios({
            method: 'get',
            url: `${PUBLICATIONS_PATH}/publications/filters`,
            cancelToken: CancelTokenService.getSource().token,
            params:queryParameters,
            headers: {
              'Accept': ResourcesVersions.FILTERS
            }
          }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }

    async function _getImage(publicationid,queryParameters){
        return await axios({
            method: 'get',
            url: `${PUBLICATIONS_PATH}/publications/${publicationid}/images`,
            cancelToken: CancelTokenService.getSource().token,
            params: queryParameters
          }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })   
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
        erasePublication : _erasePublication
      }
     })();
  
    export default PublicationService;