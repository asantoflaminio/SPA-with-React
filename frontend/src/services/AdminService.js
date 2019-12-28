import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import axios from 'axios';

const AdminService = (function(){

    const ADMIN_PATH = 'admin/'

    function _isAdmin(){
        let access = LocalStorageService.getAccessRole()
        if(access != null && access.includes("ROLE_ADMIN"))
            return true;
        else
            return false;
    }

    function _postProvice(event,props){
        axios({
            method: 'post',
            url: ADMIN_PATH + 'province',
            data: JsonService.getJSONParsed(event.target),
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }
    
    function _postCity(event,props){
        axios({
          method: 'post',
          url: ADMIN_PATH + 'city',
          data: JsonService.getJSONParsed(event.target),
          headers: {
            authorization: LocalStorageService.getAccessToken(),
        }
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    function _postNeighborhood(event,props){
        axios({
          method: 'post',
          url: ADMIN_PATH + 'neighborhood',
          data: JsonService.getJSONParsed(event.target),
          headers: {
            authorization: LocalStorageService.getAccessToken(),
        }
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _getProvinces(props){
        return await axios({
            method: 'get',
            url: ADMIN_PATH + 'getProvinces',
          })
          .then(function (response) {
              return response.data.provinces
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _getCities(event,props){
        return await axios({
            method: 'post',
            url: ADMIN_PATH + 'getCities',
            data: JsonService.getJSONParsed(event.target),
          })
          .then(function (response) {
              return response.data.cities
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _getNeighborhoods(event, props){
        return await axios({
            method: 'post',
            url: ADMIN_PATH + 'getNeighborhoods',
            data: JsonService.getJSONParsed(event.target),
          })
          .then(function (response) {
              return response.data.neighborhoods
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
      }

    async function _getUsers(page, props){
        const pageJSON = {
            "page": page
        }
        return await axios({
            method: 'post',
            url: ADMIN_PATH + 'getUsers',
            data: pageJSON
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
            url: ADMIN_PATH + 'getUsersQuantity',
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
            method: 'post',
            url: ADMIN_PATH + 'lockUser',
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
      postProvince : _postProvice,
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