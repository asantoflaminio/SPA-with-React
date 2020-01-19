import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import * as statusCode from '../util/StatusCode'
import axios from 'axios';

const UserService = (function(){

    const USERS_PATH = process.env.PUBLIC_URL + '/meinHaus/users-managment'

    function _isLogged(){
        if(LocalStorageService.getAccessToken() != null)
            return true;
        else
            return false;
    }

    async function _getUsers(queryParameters, props){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _signUp(dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/users`,
          data: dataDTO
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _checkEmailAvailability(email){
        return await axios({
          method: 'head',
          url: `${USERS_PATH}/users/${email}`,
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _login(dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/login`,
          data: dataDTO
        }).then(function (response){ return response }).catch(function (error){ return error.response })
        //OJO Q aca cambiaron cosas y seguro en lo de ro ROMPE!!!!!
    }

    async function _isAccount(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + '/isAccount',
          data: JsonService.getJSONParsed(event.target)
        }).then(function (response) {
            return response.status;
        })
        .catch(function (error) {
            if(String(error).includes(statusCode.NOT_FOUND))
                return statusCode.NOT_FOUND;
            else 
                ErrorService.logError(props,error)
        });
    }

    async function _forgottenPasswordEmail(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + '/forgottenPasswordEmail',
          data: JsonService.getJSONParsed(event.target)
        })
        .then(function (response) {
            return response.status;
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _createNewPassword(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + '/createNewPassword',
          data: JsonService.getJSONParsed(event.target)
        })
        .then(function (response) {
            return response.status;
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _postPublication(userid,dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/users/${userid}/publications`,
          data: dataDTO,
          headers: {
            authorization: LocalStorageService.getAccessToken(),
          }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _sendMessage(dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/messages`,
          data: dataDTO
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getMyPublications(userid, queryParameters){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/publications`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getMyFavoritesPublications(userid, queryParameters){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }


    async function _addFavourite(userid,dataDTO){
        return await axios({
            method: 'post',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            data: dataDTO,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _removeFavourite(userid,dataDTO){
        return await axios({
            method: 'delete',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            data: dataDTO,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }


    async function _getUser(userid){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}`,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _editUser(userid,dataDTO) {
        return await axios({
            method: 'patch',
            url: `${USERS_PATH}/users/${userid}`,
            data: dataDTO,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _lockUser(userid,queryParameters){
        return await axios({
            method: 'patch',
            url: `${USERS_PATH}/users/${userid}/lock`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

   return {
        isLogged : _isLogged,
        getUsers : _getUsers,
        getUser: _getUser,
        signUp : _signUp,
        checkEmailAvailability : _checkEmailAvailability,
        isAccount : _isAccount,
        forgottenPasswordEmail: _forgottenPasswordEmail,
        createNewPassword: _createNewPassword,
        login : _login,
        postPublication : _postPublication,
        sendMessage : _sendMessage,
        getMyPublications : _getMyPublications,
        getMyFavoritesPublications : _getMyFavoritesPublications,
        addFavourite : _addFavourite,
        removeFavourite : _removeFavourite,
        editUser: _editUser,
        lockUser : _lockUser
   }
   })();

   export default UserService;