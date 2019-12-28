import LocalStorageService from './LocalStorageService'
import ErrorService from './ErrorService'
import JsonService from './JsonService'
import axios from 'axios';

const UserService = (function(){

    const USERS_PATH = 'users/'

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

    async function _login(array, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'login',
          data: JsonService.getJSONParsed(array)
        })
        .then(function (response) {
            LocalStorageService.setToken(response.headers.authorization, response.headers.authorities)
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

    function _postImages(publicationID,images,props){
        let formData = new FormData();
        for(let i = 0; i < images.length; i++) {
            formData.append('file', images[i])
            
        }
        axios({
            method: 'post',
            url: 'users/images',
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

    async function _getMyPublicationsQuantity(array,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getQuantity',
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

    async function _getMyFavoritesCount(array,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyFavoritesQuantity',
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

    async function _getMyPublications(array, props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyPublicationsMade',
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

    async function _getMyPublicationsCount(array,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyPublicationsCount',
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

   return {
      isLogged : _isLogged,
      signUp : _signUp,
      login : _login,
      postPublication : _postPublication,
      postImages : _postImages,
      sendMessage : _sendMessage,
      getMyPublicationsQuantity : _getMyPublicationsQuantity,
      getMyFavoritesCount : _getMyFavoritesCount,
      getMyPublications : _getMyPublications,
      getMyPublicationsCount : _getMyPublicationsCount

      
    }
   })();

   export default UserService;