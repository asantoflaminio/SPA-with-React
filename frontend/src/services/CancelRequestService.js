import axios from 'axios';

const CancelTokenService = (function(){

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    function _getSource(){
        return source;
    }

    return {
        getSource : _getSource
      }
     })();
  
    export default CancelTokenService;