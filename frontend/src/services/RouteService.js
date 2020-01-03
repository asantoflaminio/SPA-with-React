const RouteService = (function(){

    const localhost = "localhost";
    const pawserver = "pawserver.it.itba.edu.ar"
    const groupID = "/paw-2018b-10"
    const initial = "http://"

    function _getHomePage(window){
        let homePage = window && window.location && window.location.hostname;
        let base_url;
        if(homePage === localhost)
            base_url = "";
        else if (homePage === pawserver)
            base_url = initial + pawserver + groupID;

        
        alert(base_url)
        return base_url;
    }

    return {
        getHomePage : _getHomePage,
      }
     })();
  
    export default RouteService;