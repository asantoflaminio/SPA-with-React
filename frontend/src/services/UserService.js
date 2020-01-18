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

    async function _postPublication(userid,event, props){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/users/${userid}/publications`,
          data: JsonService.getJSONParsed(event.target),
          headers: {
            authorization: LocalStorageService.getAccessToken(),
          }
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _postImages(publicationID,images,props){
        let formData = new FormData();
        formData.append("publicationid",publicationID)
        for(let i = 0; i < images.length; i++) {
            formData.append('files', images[i])
        }
        axios({
            method: 'post',
            url: USERS_PATH + '/images',
            data: formData,
            headers: {
                contentType:'multipart/form-data'},
                authorization: LocalStorageService.getAccessToken()
    
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _sendMessage(dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/messages`,
          data: dataDTO
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getMyPublications(userid, queryParameters, props){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/publications`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          })
          .then(function (response) {
              return response
          })
          .catch(function (error) {
              ErrorService.logError(props,error)
          });
    }

    async function _getMyFavoritesPublications(userid, queryParameters, props){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          })
          .then(function (response) {
              return response
          })
          .catch(function (error) {
              ErrorService.logError(props,error)
          });
    }


    async function _favouritePublication(array,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + '/favouritePublication',
            data: JsonService.getJSONParsed(array),
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          })
          .catch(function (error) {
              ErrorService.logError(props,error)
          });
    }

    async function _unfavouritePublication(array,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + '/unfavouritePublication',
            data: JsonService.getJSONParsed(array),
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          })
          .catch(function (error) {
              ErrorService.logError(props,error)
          });
    }

    async function _updateInformation(array, props) {
        return await axios({
            method: 'put',
            url: USERS_PATH + '/information',
            data: JsonService.getJSONParsed(array),
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
        })
        .then(function (response) {
            LocalStorageService.setToken(response.headers.authorization, response.headers.authorities, response.headers.username)
        })
        .catch(function (error) {
              ErrorService.logError(props,error)
        });
    }

    async function _retrievePersonalInformation(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + '/profile',
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
          })
          .then(function (response) {
              return response.data
          })
          .catch(function (error) {
              ErrorService.logError(props,error)
          });
    }

    async function _updatePassword(array, props) {
        return await axios({
            method: 'put',
            url: USERS_PATH + '/password',
            data: JsonService.getJSONParsed(array),
            headers: {
                authorization: LocalStorageService.getAccessToken(),
            }
        }).catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _lockUser(userid,queryParameters){
        return await axios({
            method: 'put',
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
        signUp : _signUp,
        checkEmailAvailability : _checkEmailAvailability,
        isAccount : _isAccount,
        forgottenPasswordEmail: _forgottenPasswordEmail,
        createNewPassword: _createNewPassword,
        login : _login,
        postPublication : _postPublication,
        postImages : _postImages,
        sendMessage : _sendMessage,
        getMyPublications : _getMyPublications,
        getMyFavoritesPublications : _getMyFavoritesPublications,
        favouritePublication : _favouritePublication,
        unfavouritePublication : _unfavouritePublication,
        updateInformation: _updateInformation,
        retrievePersonalInformation: _retrievePersonalInformation,
        updatePassword: _updatePassword,
        lockUser : _lockUser
   }
   })();

   export default UserService;