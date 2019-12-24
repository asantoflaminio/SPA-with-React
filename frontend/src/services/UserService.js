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
          data: JsonService.getJSONObject(event.target,6)
        })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

    async function _login(email, password, props){
        const data = {
            email: email,
            password: password
          }
        return await axios({
          method: 'post',
          url: USERS_PATH + 'login',
          data: data
        })
        .then(function (response) {
            LocalStorageService.setToken(response.headers.authorization, response.headers.authorities)
        })
        .catch(function (error) {
            ErrorService.logError(props,error)
        });
    }

   return {
      isLogged : _isLogged,
      signUp : _signUp,
      login : _login
    }
   })();

   export default UserService;