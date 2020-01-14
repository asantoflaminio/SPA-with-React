import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import * as statusCode from '../util/StatusCode'
import axios from 'axios';

const LocationService = (function(){

    const LOCATIONS_PATH = 'meinHaus/locations-management'

    async function _postProvince(event,props){
        return await axios({
            method: 'post',
            url: `${LOCATIONS_PATH}/provinces`,
            data: JsonService.getJSONParsed(event.target),
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
        })
        .then(function (response){
            return response.status
        })
        .catch(function (error) {
            if(String(error).includes(statusCode.CONFLICT))
                return statusCode.CONFLICT;
            ErrorService.logError(props,error)
        });
    }
    
    async function _postCity(event,props){
        return await axios({
          method: 'post',
          url: `${LOCATIONS_PATH}/cities`,
          data: JsonService.getJSONParsed(event.target),
          headers: {
            authorization: LocalStorageService.getAccessToken(),
        }
        })
        .then(function (response){
            return response.status
        })
        .catch(function (error) {
            if(String(error).includes(statusCode.CONFLICT))
                return statusCode.CONFLICT;
            ErrorService.logError(props,error)
        });
    }

    async function _postNeighborhood(event,props){
        return await axios({
          method: 'post',
          url: `${LOCATIONS_PATH}/neighborhoods`,
          data: JsonService.getJSONParsed(event.target),
          headers: {
            authorization: LocalStorageService.getAccessToken(),
        }
        })
        .then(function (response){
            return response.status
        })
        .catch(function (error) {
            if(String(error).includes(statusCode.CONFLICT))
                return statusCode.CONFLICT;
            ErrorService.logError(props,error)
        });
    }

    async function _getProvinces(props){
        return await axios({
            method: 'get',
            url: `${LOCATIONS_PATH}/provinces`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getCities(provinceid,props){
        return await axios({
            method: 'get',
            url: `${LOCATIONS_PATH}/provinces/${provinceid}/cities`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _getNeighborhoods(provinceid,cityid, props){
        return await axios({
            method: 'get',
            url: `${LOCATIONS_PATH}/provinces/${provinceid}/cities/${cityid}/neighborhoods`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }
    

   return {
      postProvince : _postProvince,
      postCity : _postCity,
      postNeighborhood : _postNeighborhood,
      getProvinces : _getProvinces,
      getCities : _getCities,
      getNeighborhoods : _getNeighborhoods
    }
   })();

   export default LocationService;