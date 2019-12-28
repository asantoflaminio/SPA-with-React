import ErrorService from "./ErrorService";
import axios from 'axios';
import JsonService from './JsonService'

const PublicationService = (function(){

    const PUBLICATIONS_PATH = 'publications/'
    
    async function _getSalePublications(props){
        return await axios({
            method: 'get',
            url: PUBLICATIONS_PATH + 'getSalePublications',
          })
          .then(function (response) {
              return response.data.publications
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getRentPublications(props){
        return await axios({
            method: 'get',
            url: PUBLICATIONS_PATH + 'getRentPublications',
          })
          .then(function (response) {
              return response.data.publications
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getPublicationsCount(query, props){
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + 'getPublicationsQuantity',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getPublication(id, props){
        const idJSON = {"id": id,}
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + 'getPublicationByID',
            data: idJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getPublications(query, props){
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + 'getPublications',
            data: query
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
            url: PUBLICATIONS_PATH + 'getFilters',
            data: query
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getImage(publicationID,index,props){
        const request = JsonService.generateImageJSON(publicationID,index)
        const jsonObject = JSON.parse(request);
        return await axios({
            method: 'post',
            url: PUBLICATIONS_PATH + 'getPublicationImage',
            data: jsonObject,
          })
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });       
    }

    

    return {
        getSalePublications : _getSalePublications,
        getRentPublications : _getRentPublications,
        getPublicationsCount : _getPublicationsCount,
        getPublication : _getPublication,
        getPublications : _getPublications,
        getFilters : _getFilters,
        getImage : _getImage
      }
     })();
  
    export default PublicationService;