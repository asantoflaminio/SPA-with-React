import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import axios from 'axios';

const AdminService = (function(){

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
            url: 'admin/province',
            data: JsonService.getJSONForm(event),
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
          url: 'admin/city',
          data: JsonService.getJSONForm(event),
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
          url: 'admin/neighborhood',
          data: JsonService.getJSONForm(event),
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
            url: 'admin/getProvinces',
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
            url: 'admin/getCities',
            data: JsonService.getJSONForm(event),
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
            url: 'admin/getNeighborhoods',
            data: JsonService.getJSONForm(event),
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
            url: 'admin/getUsers',
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
            url: 'admin/getUsersQuantity',
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
            url: 'admin/lockUser',
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