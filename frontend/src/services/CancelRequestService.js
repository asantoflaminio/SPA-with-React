import axios from 'axios';

const CancelTokenService = (function(){

    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();

    function _getSource(){
        let cancelToken = source;
        source = createNewToken()
        return cancelToken;
    }

    function createNewToken(){
        return CancelToken.source();
    }

    return {
        getSource : _getSource
      }
     })();
  
    export default CancelTokenService;