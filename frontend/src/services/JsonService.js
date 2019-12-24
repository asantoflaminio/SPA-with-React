const JsonService = (function(){

    function _getJSON(array,quantity){
        let result = "{";
        for(var i = 0; i < quantity; i++){
            if(array[i].type === "radio" && array[i].checked === false){
                quantity = quantity + 1;
            }else{
                result += '"' + array[i].name + '"' + ":" + '"' + array[i].value + '"' ;
                if(i !== quantity - 1)
                    result += ",";
            }
        }
        result += "}"
        return result;
    }

    function _generateImageJSON(publicationID, index){
        let result = "{";

        result += '"' + "publicationID" + '"' + ":" + '"' + publicationID + '"' ;
        result += ",";
        result += '"' + "index" + '"' + ":" + '"' + index + '"' ;
        result += "}"

        return result;

    }

    function _getJSONSingle(target){
        let result = "{"
        result += '"' + target.name + '"' + ":" + '"' + target.value + '"';
        result += "}";
        return result;
    }

    function _getJSONObject(array,quantity){
        let jsonData = _getJSON(array,quantity)
        return JSON.parse(jsonData)
    }

    return {
        getJSON : _getJSON,
        generateImageJSON : _generateImageJSON,
        getJSONSingle : _getJSONSingle,
        getJSONObject : _getJSONObject
    }
    })();

 export default JsonService;