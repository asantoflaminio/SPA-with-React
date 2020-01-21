import LocalStorageService from './LocalStorageService'
import * as ResourcesVersions from '../util/ResourcesVersions'
import axios from 'axios';

const UserService = (function(){

    const USERS_PATH = process.env.PUBLIC_URL + '/meinHaus/users-managment'

    function _isLogged(){
        if(LocalStorageService.getAuthorization() != null)
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
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.USER
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
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
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.PUBLICATION
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
    }

    async function _getMyFavoritesPublications(userid, queryParameters){
        return await axios({
            method: 'get',
            url: `${USERS_PATH}/users/${userid}/favourite-publications`,
            params: queryParameters,
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.PUBLICATION
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
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
            headers: {
                authorization: LocalStorageService.getAuthorization(),
                'Accept': ResourcesVersions.USER
            }
          }).then(function (response){ return response }).catch(function (error){ return error.response })
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
        getUsers : _getUsers,
        getUser: _getUser,
        signUp : _signUp,
        checkEmail : _checkEmail,
        forgottenPasswordEmail: _forgottenPasswordEmail,
        resetPassword: _resetPassword,
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