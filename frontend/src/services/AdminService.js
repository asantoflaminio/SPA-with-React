import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import * as statusCode from '../util/StatusCode'
import axios from 'axios';

const AdminService = (function(){

    const ADMIN_PATH = 'meinHaus/admin'
    const ROLE_ADMIN = "ROLE_ADMIN"

    function _isAdmin(){
        let access = LocalStorageService.getAccessRole()
        if(access != null && access.includes(ROLE_ADMIN))
            return true;
        else
            return false;
    }

    async function _province(event,props){
        return await axios({
            method: 'post',
            url: `${ADMIN_PATH}/province`,
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
    
    async function _city(event,props){
        return await axios({
          method: 'post',
          url: `${ADMIN_PATH}/city`,
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

    async function _neighborhood(event,props){
        return await axios({
          method: 'post',
          url: `${ADMIN_PATH}/neighborhood`,
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

    async function _allProvinces(props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/allProvinces`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _allCities(provinceID,props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/allCities/${provinceID}`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _allNeighborhoods(cityID, props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/allNeighborhoods/${cityID}`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _allUsers(queryParameters, props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/allUsers`,
            params: queryParameters
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _allUsersCount(props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/allUsersCount`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    function _lockUser(status,id, props){
        const idJSON = {
            "id": id,
            "locked" : status
        }
        return axios({
            method: 'put',
            url: ADMIN_PATH + '/lockUser',
            data: idJSON
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

   return {
      isAdmin : _isAdmin,
      province : _province,
      city : _city,
      neighborhood : _neighborhood,
      allProvinces : _allProvinces,
      allCities : _allCities,
      allNeighborhoods : _allNeighborhoods,
      allUsers : _allUsers,
      allUsersCount : _allUsersCount,
      lockUser : _lockUser,
    }
   })();

   export default AdminService;