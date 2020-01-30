const LocalStorageService = (function(){
    var _service;

    const AUTH_TOKEN = "access_token";
    const ACCESS_TOKEN = "access_role";
    const USERNAME_TOKEN = "username";
    const USERID_TOKEN = "userid";
    const COUNTER = "counter"
    const CryptoJS = require("crypto-js");

    const KEY = "MIIBOQIBAAJAcrqH0L91/j8sglOeroGyuKr1ABvTkZj0ATLBcvsA91/C7fipAsOn" +
    "RqRPZr4Ja+MCx0Qvdc6JKXa5tSb51bNwxwIDAQABAkBPzI5LE+DuRuKeg6sLlgrJ" +
    "h5+Bw9kUnF6btsH3R78UUANOk0gGlu9yUkYKUkT0SC9c6HDEKpSqILAUsXdx6SOB" +
    "AiEA1FbR++FJ56CEw1BiP7l1drM9Mr1UVvUp8W71IsoZb1MCIQCKUafDLg+vPj1s" + 
    "HiEdrPZ3pvzvteXLSuniH15AKHEuPQIhAIsgB519UysMpXBDbtxJ64jGj8Z6/pOr" +
    "NrwV80/EEz45AiBlgTLZ2w2LjuNIWnv26R0eBZ+M0jHGlD06wcZK0uLsCQIgT1kC" +
    "uNcDTERjwEbFKJpXC8zTLSPcaEOlbiriIKMnpNwawdaWdwadadawDAWDADawe3gr" +
    "nkjsnfnsefFSFmo3n4nsfor3429401aondcoadwn4dmadlzWVRadawdAZDWEdaaw"

    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }

    function _refreshToken(authorization, username) {
        _clearAuthorization()
        _clearUsername()
        _setAuthorization(authorization)
        _setUsername(username)
    }


    function _setToken(authorization, role, username, userid) {
      _setAuthorization(authorization)
      _setRole(role)
      _setUsername(username)
      _setUserid(userid)
    }

    function _setAuthorization(authorization){
      let token = authorization
      let reducedToken = token.replace("Bearer ","")
      return localStorage.setItem(AUTH_TOKEN,reducedToken)
    }

    function _setRole(role){
      let cypherRole = CryptoJS.AES.encrypt(role,KEY)
      return localStorage.setItem(ACCESS_TOKEN,cypherRole)
    }

    function _setUsername(username){
      let cypherUsername = CryptoJS.AES.encrypt(username,KEY)
      return localStorage.setItem(USERNAME_TOKEN,cypherUsername)
    }

    function _setUserid(userid){
      let cypherUsername = CryptoJS.AES.encrypt(userid,KEY)
      return localStorage.setItem(USERID_TOKEN,cypherUsername)
    }

    function _getAuthorization() {
      return localStorage.getItem(AUTH_TOKEN);
    }

    function _getRole() {
      let cypherRole = localStorage.getItem(ACCESS_TOKEN)
      let role = CryptoJS.AES.decrypt(cypherRole,KEY)
      return role.toString(CryptoJS.enc.Utf8)
    }

    function _getUsername(){
      let cypherUsername = localStorage.getItem(USERNAME_TOKEN)
      if(cypherUsername !== null){
        let username = CryptoJS.AES.decrypt(cypherUsername,KEY)
        return username.toString(CryptoJS.enc.Utf8)
      }

    }

    function _getUserid(){
      let cypherUserid = localStorage.getItem(USERID_TOKEN)
      let userid = CryptoJS.AES.decrypt(cypherUserid,KEY)
      return userid.toString(CryptoJS.enc.Utf8)
    }

    function _clearAuthorization() {
      localStorage.removeItem(AUTH_TOKEN);
    }

    function _clearAccessRole() {
      localStorage.removeItem(ACCESS_TOKEN)
    }

    function _clearUsername(){
      localStorage.removeItem(USERNAME_TOKEN)
    }

    function _clearUserid(){
      localStorage.removeItem(USERID_TOKEN)
    }

    function _clearToken() {
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.removeItem(USERID_TOKEN)
      localStorage.removeItem(USERNAME_TOKEN)
      localStorage.removeItem(ACCESS_TOKEN)
    }

    function _initializeCounter(){
      localStorage.setItem(COUNTER,"0")
    }

    function _incrementCounter(){
      localStorage.setItem(COUNTER,String(parseInt(_getCounter()) + 1))
    }

    function _getCounter(){
      return parseInt(localStorage.getItem(COUNTER))
    }

    function _deleteCounter(){
      localStorage.removeItem(COUNTER)
    }

   return {
      getService : _getService,
      refreshToken : _refreshToken,
      setToken : _setToken,
      setAuthorization : _setAuthorization,
      setRole: _setRole,
      setUsername : _setUsername,
      setUserid: _setUserid,
      getAuthorization : _getAuthorization,
      getRole : _getRole,
      getUsername : _getUsername,
      getUserid : _getUserid,
      clearAuthorization : _clearAuthorization,
      clearAccessRole : _clearAccessRole,
      clearUsername : _clearUsername,
      clearUserid : _clearUserid,
      clearToken : _clearToken,
      initializeCounter : _initializeCounter,
      incrementCounter : _incrementCounter,
      getCounter: _getCounter,
      deleteCounter : _deleteCounter
    }
   })();
   export default LocalStorageService;