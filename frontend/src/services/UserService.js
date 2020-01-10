import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import * as statusCode from '../util/StatusCode'
import axios from 'axios';

const UserService = (function(){

    const USERS_PATH = process.env.PUBLIC_URL + '/meinHaus/users/'

    function _isLogged(){
        if(LocalStorageService.getAccessToken() != null)
            return true;
        else
            return false;
    }

    async function _signUp(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'signUp',
          data: JsonService.getJSONParsed(event.target)
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _checkEmailAvaibility(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'checkEmail',
          data: JsonService.getJSONParsed(event.target)
        })
        .catch(function (error) {
            if(String(error).includes(statusCode.CONFLICT))
                return false;
            ErrorService.logError(props,error)
        });
    }

    async function _forgottenPasswordEmail(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'forgottenPasswordEmail',
          data: JsonService.getJSONParsed(event.target)
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _login(array, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'login',
          data: JsonService.getJSONParsed(array)
        })
        .then(function (response) {
            LocalStorageService.setToken(response.headers.authorization, response.headers.authorities, response.headers.username)
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _postPublication(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'publish',
          data: JsonService.getJSONParsed(event.target),
          headers: {
            authorization: LocalStorageService.getAccessToken(),
          }
        })
        .then(function (response) {
            return response.data.id;
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
            url: USERS_PATH + 'images',
            data: formData,
            headers: {
                contentType:'multipart/form-data'},
                authorization: LocalStorageService.getAccessToken()
    
          })
          .catch(function (error) {
            ErrorService.logError(props,error)
          });
    }

    async function _sendMessage(event, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'sendMessage',
          data: JsonService.getJSONParsed(event.target)
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _getMyPublicationsQuantity(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + 'getMyPublicationsQuantity',
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

    async function _getMyFavoritesQuantity(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + 'getMyFavoritesQuantity',
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

    async function _getMyPublications(array, props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyPublications',
            data: JsonService.getJSONParsed(array),
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

    async function _getMyFavoritesPublications(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + 'getMyFavoritesPublications',
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

    async function _getMyPublicationsCount(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + 'getMyPublicationsCount',
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

    async function _getMyFavoritesPublicationsCount(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + 'getMyFavoritesPublicationsCount',
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

    async function _favouritePublication(array,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'favouritePublication',
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
            url: USERS_PATH + 'unfavouritePublication',
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
            method: 'post',
            url: USERS_PATH + 'updateInformation',
            data: JsonService.getJSONParsed(array),
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

    async function _retrievePersonalInformation(props){
        return await axios({
            method: 'get',
            url: USERS_PATH + 'retrievePersonalInformation',
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

   return {
      isLogged : _isLogged,
      signUp : _signUp,
      checkEmailAvaibility : _checkEmailAvaibility,
      forgottenPasswordEmail: _forgottenPasswordEmail,
      login : _login,
      postPublication : _postPublication,
      postImages : _postImages,
      sendMessage : _sendMessage,
      getMyPublicationsQuantity : _getMyPublicationsQuantity,
        getMyFavoritesQuantity : _getMyFavoritesQuantity,
        getMyPublications : _getMyPublications,
        getMyFavoritesPublications : _getMyFavoritesPublications,
        getMyPublicationsCount : _getMyPublicationsCount,
        getMyFavoritesPublicationsCount : _getMyFavoritesPublicationsCount,
        favouritePublication : _favouritePublication,
        unfavouritePublication : _unfavouritePublication,
        updateInformation: _updateInformation,
        retrievePersonalInformation: _retrievePersonalInformation
   }
   })();

   export default UserService;