import LocalStorageService from './LocalStorageService'
import * as ResourcesVersions from '../util/ResourcesVersions'
import CancelTokenService from './CancelRequestService';
import axios from 'axios';

const UserService = (function(){

    const USERS_PATH = process.env.PUBLIC_URL + '/meinHaus/users-management'
    const ROLE_ADMIN = "ROLE_ADMIN"

    function _isLogged(){
        if(LocalStorageService.getAuthorization() != null)
            return true;
        else
            return false;
    }

    function _isAdmin(){
      if(LocalStorageService.getRole().includes(ROLE_ADMIN))
        return true;
      else
        return false;
    }

    async function _getUsers(queryParameters){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users`,
            cancelToken: CancelTokenService.getSource().token,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.USER
            }
          }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }

    async function _signUp(dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/users`,
          data: dataDTO,
          headers:{
            'Content-Type': ResourcesVersions.USER,
            'Accept': ResourcesVersions.USER
          }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _checkEmail(email){
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
    }

    async function _forgottenPasswordEmail(email){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/users/${email}/password-reset`,
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _resetPassword(dataDTO){
        return await axios({
          method: 'patch',
          url: `${USERS_PATH}/users/password-reset`,
          data: dataDTO,
          headers : {
            'Content-Type': ResourcesVersions.RESETPASSWORD
          }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _postPublication(userid,dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/users/${userid}/publications`,
          data: dataDTO,
          headers: {
            authorization: LocalStorageService.getAuthorization(),
            'Content-Type': ResourcesVersions.PUBLICATION,
            'Accept': ResourcesVersions.PUBLICATION
          }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getPublication(userid, publicationid) {
      return await axios({
          method: 'get',
          url: `${USERS_PATH}/users/${userid}/publications/${publicationid}`,
          cancelToken: CancelTokenService.getSource().token,
          headers: {
              authorization: LocalStorageService.getAuthorization(),
          }
      }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }

    async function _editPublication(userid, publicationid, dataDTO) { //TODO:chequear si esta bien, nueva funcion
      return await axios({
        method: 'patch',
        url: `${USERS_PATH}/users/${userid}/publications/${publicationid}`,
        data: dataDTO,
        headers: {
            authorization: LocalStorageService.getAuthorization(),
            'Content-Type': ResourcesVersions.USER,
        }
      }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _erasePublication(userid, publicationid){ //TODO:chequear si esta bien, nueva funcion
      return await axios({
        method: 'delete',
        url: `${USERS_PATH}/users/${userid}/publications/${publicationid}`,
        headers: {
          authorization: LocalStorageService.getAuthorization()
      }
      }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _sendMessage(dataDTO){
        return await axios({
          method: 'post',
          url: `${USERS_PATH}/messages`,
          data: dataDTO,
          headers: {
            'Content-Type': ResourcesVersions.MESSAGE
          }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getMyPublications(userid, queryParameters){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/publications`,
            cancelToken: CancelTokenService.getSource().token,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.PUBLICATION
            }
          }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }

    async function _getMyFavoritesPublications(userid, queryParameters){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            cancelToken: CancelTokenService.getSource().token,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.PUBLICATION
            }
          }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }


    async function _addFavourite(userid,dataDTO){
        return await axios({
            method: 'post',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            data: dataDTO,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Content-Type': ResourcesVersions.FAVPUBLICATION
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _removeFavourite(userid,publicationid){
        return await axios({
            method: 'delete',
            url: `${USERS_PATH}/users/${userid}/favourite-publications/${publicationid}`,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }


    async function _getUser(userid){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}`,
            cancelToken: CancelTokenService.getSource().token,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.USER
            }
          }).then(function (response){ return response }).catch(function (error){ return (axios.isCancel(error) ? error : error.response) })
    }

    async function _editUser(userid,dataDTO) {
        return await axios({
            method: 'patch',
            url: `${USERS_PATH}/users/${userid}`,
            data: dataDTO,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Content-Type': ResourcesVersions.USER,
            }
        }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _lockUser(userid,queryParameters){
        return await axios({
            method: 'patch',
            url: `${USERS_PATH}/users/${userid}/lock`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

   return {
        isLogged : _isLogged,
        isAdmin: _isAdmin,
        getUsers : _getUsers,
        getUser: _getUser,
        signUp : _signUp,
        checkEmail : _checkEmail,
        forgottenPasswordEmail: _forgottenPasswordEmail,
        resetPassword: _resetPassword,
        login : _login,
        postPublication : _postPublication,
        getPublication: _getPublication,
        editPublication: _editPublication,
        erasePublication: _erasePublication,
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