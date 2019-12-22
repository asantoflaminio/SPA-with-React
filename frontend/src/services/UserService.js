import LocalStorageService from './LocalStorageService'

const UserService = (function(){

    function _isLogin(){
        if(LocalStorageService.getAccessToken() != null)
            return true;
        else
            return false;
    }

   return {
      isLogin : _isLogin,
    }
   })();

   export default UserService;