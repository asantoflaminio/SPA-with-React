const LocalStorageService = (function(){
    var _service;

    const AUTH_TOKEN = "access_token";
    const ACCESS_TOKEN = "access_role";
    const USERNAME_TOKEN = "username";
    const USERID_TOKEN = "userid";
    const ROLE_ADMIN = "ROLE_ADMIN";
    const ROLE_USER = "ROLE_USER";
    const COUNTER = "counter"

    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }

    function _refreshToken(authorization, username) {
        _clearToken();
        _setAuthorization(authorization)
        _setUsername(username)
    }


    function _setToken(authorization, access, username, userid) {
      let max_acess = _decideAccess(access);
      localStorage.setItem(AUTH_TOKEN, authorization);
      localStorage.setItem(ACCESS_TOKEN, max_acess)
      localStorage.setItem(USERNAME_TOKEN,username)
      localStorage.setItem(USERID_TOKEN,userid)
    }

    function _setAuthorization(authorization){
      return localStorage.setItem(AUTH_TOKEN,authorization)
    }

    function _setUsername(username){
      return localStorage.setItem(USERNAME_TOKEN,username)
    }

    function _getAuthorization() {
      return localStorage.getItem(AUTH_TOKEN);
    }

    function _getAccessRole() {
      return localStorage.getItem(ACCESS_TOKEN);
    }

    function _getUsername(){
      return localStorage.getItem(USERNAME_TOKEN)
    }

    function _getUserid(){
      return localStorage.getItem(USERID_TOKEN)
    }

    function _clearToken() {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USERNAME_TOKEN)
    }

    function _initializeCounter(){
      localStorage.setItem(COUNTER,"0")
    }

    function _incrementCounter(){
      let increment = _getCounter() + 1;
      localStorage.setItem(COUNTER,String(increment))
    }

    function _getCounter(){
      return parseInt(localStorage.getItem(COUNTER))
    }

    function _deleteCounter(){
      localStorage.removeItem(COUNTER)
    }

    function _decideAccess(access_role){
      if(access_role.includes(ROLE_ADMIN))
        return ROLE_ADMIN
      else
      return ROLE_USER
    }

   return {
      getService : _getService,
      refreshToken : _refreshToken,
      setToken : _setToken,
      setAuthorization : _setAuthorization,
      setUsername : _setUsername,
      getAuthorization : _getAuthorization,
      getAccessRole : _getAccessRole,
      getUsername : _getUsername,
      getUserid : _getUserid,
      clearToken : _clearToken,
      initializeCounter : _initializeCounter,
      incrementCounter : _incrementCounter,
      getCounter: _getCounter,
      deleteCounter : _deleteCounter
    }
   })();
   export default LocalStorageService;