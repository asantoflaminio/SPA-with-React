import * as StatusCode from '../util/StatusCode'
import LocalStorageService from './LocalStorageService';

const ErrorService = (function(){

    const ERROR_PATH = '/error'
    
    function _logError(props,response){
        if(response.status === StatusCode.UNAUTHORIZED){
          LocalStorageService.clearToken()
          props.history.push({
            pathname: '/SignUp',
            search: '?expiredAuthorization=true',
        });
        alert("asd")
        return
        }

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