import LocalStorageService from './LocalStorageService'

const UserService = (function(){

    function _isLogged(){
        if(LocalStorageService.getAccessToken() != null)
            return true;
        else
            return false;
    }

   return {
      isLogged : _isLogged,
    }
   })();

   export default UserService;