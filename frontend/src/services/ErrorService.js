const ErrorService = (function(){

    const ERROR_PATH = '/error'
    
    function _logError(props,response){
        props.history.push({
            pathname: ERROR_PATH,
            state: { coding: response.status }
          })
    }

    return {
        logError : _logError,
      }
     })();
  
    export default ErrorService;