const LocalStorageService = (function(){
    var _service;

    const AUTH_TOKEN = "access_token";
    const ACCESS_TOKEN = "access_role";
    const USERNAME_TOKEN = "username";
    const ROLE_ADMIN = "ROLE_ADMIN"
    const ROLE_USER = "ROLE_USER"

    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }

    function _setToken(authorization, access, username) {
      let max_acess = _decideAccess(access);
      localStorage.setItem(AUTH_TOKEN, authorization);
      localStorage.setItem(ACCESS_TOKEN, max_acess)
      localStorage.setItem(USERNAME_TOKEN,username)
    }

    function _getAccessToken() {
      return localStorage.getItem(AUTH_TOKEN);
    }

    function _getAccessRole() {
      return localStorage.getItem(ACCESS_TOKEN);
    }

    function _getUsername(){
      return localStorage.getItem(USERNAME_TOKEN)
    }

    function _clearToken() {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USERNAME_TOKEN)
    }

    function _decideAccess(access_role){
      if(access_role.includes(ROLE_ADMIN))
        return ROLE_ADMIN
      else
      return ROLE_USER
    }

   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      getAccessRole : _getAccessRole,
      getUsername : _getUsername,
      clearToken : _clearToken
    }
   })();
   export default LocalStorageService;