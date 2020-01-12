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

    async function _postProvince(event,props){
        return await axios({
            method: 'post',
            url: `${ADMIN_PATH}/provinces`,
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
          url: `${ADMIN_PATH}/cities`,
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
          url: `${ADMIN_PATH}/neighborhoods`,
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
            url: `${ADMIN_PATH}/provinces`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getCities(provinceID,props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/provinces/${provinceID}/cities`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _getNeighborhoods(provinceID,cityID, props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/provinces/${provinceID}/cities/${cityID}/neighborhoods`,
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _getUsers(queryParameters, props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/users`,
            params: queryParameters
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getUsersCount(props){
        return await axios({
            method: 'get',
            url: `${ADMIN_PATH}/usersCount`,
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
      postProvince : _postProvince,
      postCity : _postCity,
      postNeighborhood : _postNeighborhood,
      getProvinces : _getProvinces,
      getCities : _getCities,
      getNeighborhoods : _getNeighborhoods,
      getUsers : _getUsers,
      getUsersCount : _getUsersCount,
      lockUser : _lockUser,
    }
   })();

   export default AdminService;