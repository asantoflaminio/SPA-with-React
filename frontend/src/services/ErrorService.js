const ErrorService = (function(){

    const ERROR_PATH = '/error'
    
    function _logError(props,error){
        props.history.push({
            pathname: ERROR_PATH,
            state: { coding: error.response.status }
          })
    }

    return {
        logError : _logError,
      }
     })();
  
    export default ErrorService;