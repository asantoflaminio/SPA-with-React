const LocalStorageService = (function(){
    var _service;

    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }

    function _setToken(access_token, access_role) {
      let max_acess = _decideAccess(access_role);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("access_role", max_acess)
    }

    function _getAccessToken() {
      return localStorage.getItem("access_token");
    }

    function _getAccessRole() {
      return localStorage.getItem("access_role");
    }

    function _clearToken() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("access_role");
    }

    function _decideAccess(access_role){
      if(access_role.includes("ROLE_ADMIN"))
        return "[ROLE_ADMIN]"
      else
      return "[ROLE_USER]"
    }

   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      getAccessRole : _getAccessRole,
      clearToken : _clearToken
    }
   })();
   export default LocalStorageService;