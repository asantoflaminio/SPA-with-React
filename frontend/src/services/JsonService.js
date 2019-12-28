const JsonService = (function(){

    function _getFormValues(target){
        let array = []
        for(let i = 0; i < target.length; i++){
            if( (target[i].type === "radio" && array[i].checked === false) || target[i].type === "submit")
                continue;
            else{
                array.push(new JsonObject(target[i].name,target[i].value))
            }
        }
        return array;
    }

    function _createJSONArray(names,values){
        let array = []

        if(names.length !== values.length)
            alert("PROBLEM! --- DEBERIA LANZAR EXCEPCION")

        for(let i = 0; i < names.length; i++){
            array.push(new JsonObject(names[i],values[i]))
        }

        return array;
    }

    function _getJSON(array){
        let result = "{";
        for(var i = 0; i < array.length; i++){
            result += '"' + array[i].name + '"' + ":" + '"' + array[i].value + '"' ;
            if(i !== array.length - 1)
                result += ",";
        }
        result += "}"
        alert(result)
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

    function _getJSONForm(event){
        let array = _getFormValues(event.target)
        let jsonData = _getJSON(array)
        return JSON.parse(jsonData)
    }

    function _getJSONArray(names,values){
        let array = _createJSONArray(names,values)
        let jsonData = _getJSON(array);
        return JSON.parse(jsonData)
    }

    return {
        getFormValues : _getFormValues,
        createJSONArray : _createJSONArray,
        getJSON : _getJSON,
        generateImageJSON : _generateImageJSON,
        getJSONSingle : _getJSONSingle,
        getJSONForm : _getJSONForm,
        getJSONArray : _getJSONArray
    }
    })();

export class JsonObject{
    constructor(name,value){
        this.name = name;
        this.value = value
    }
}

export default JsonService;