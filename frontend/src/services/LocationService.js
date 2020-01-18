import LocalStorageService from './LocalStorageService'
import axios from 'axios';

const LocationService = (function(){

    const LOCATIONS_PATH = 'meinHaus/locations-management'

    async function _postProvince(dataDTO){
        return await axios({
            method: 'post',
            url: `${LOCATIONS_PATH}/provinces`,
            data: dataDTO,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }
    
    async function _postCity(provinceid,dataDTO){
        return await axios({
          method: 'post',
          url: `${LOCATIONS_PATH}/provinces/${provinceid}/cities`,
          data: dataDTO,
          headers: {
            authorization: LocalStorageService.getAccessToken(),
        }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _postNeighborhood(cityid,dataDTO){
        return await axios({
          method: 'post',
          url: `${LOCATIONS_PATH}/cities/${cityid}/neighborhoods`,
          data: dataDTO,
          headers: {
            authorization: LocalStorageService.getAccessToken(),
        }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getProvinces(){
        return await axios({
            method: 'get',
            url: `${LOCATIONS_PATH}/provinces`,
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getCities(provinceid){
        return await axios({
            method: 'get',
            url: `${LOCATIONS_PATH}/provinces/${provinceid}/cities`,
          }).then(function (response){ return response }).catch(function (error){ return error.response })
      }

    async function _getNeighborhoods(cityid){
        return await axios({
            method: 'get',
            url: `${LOCATIONS_PATH}/cities/${cityid}/neighborhoods`,
          }).then(function (response){ return response }).catch(function (error){ return error.response })
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