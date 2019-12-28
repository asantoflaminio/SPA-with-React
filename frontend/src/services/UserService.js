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
          data: JsonService.getJSONForm(event)
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _login(names, values, props){
        return await axios({
          method: 'post',
          url: USERS_PATH + 'login',
          data: JsonService.getJSONArray(names,values)
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
          data: JsonService.getJSONForm(event),
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
          data: JsonService.getJSONObject(event.target,5)
        })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _getMyPublicationsQuantity(id,props){
        const idJSON = {"id": id}
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getQuantity',
            data: idJSON,
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

    async function _getMyFavoritesCount(id,props){
        const idJSON = {"id": id}
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyFavoritesQuantity',
            data: idJSON,
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

    async function _getMyPublications(id, page, props){
        const dat = {
            "id": id, 
            "page": page
        }
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyPublicationsMade',
            data: dat,
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

    async function _getMyPublicationsCount(id,props){
        return await axios({
            method: 'post',
            url: USERS_PATH + 'getMyPublicationsCount',
            data: id,
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