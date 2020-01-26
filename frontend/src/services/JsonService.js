const JsonService = (function(){

    function _getFormValues(target){
        let array = []
        if(target.length == null){
            array.push(new JsonObject(target.name, target.value))
            return array;
        }
        for(let i = 0; i < target.length; i++){
            if( (target[i].type === "radio" && target[i].checked === false) || target[i].type === "submit" || target[i].type === "button"
                || target[i].type === "file")
                continue;
            else if(target[i] instanceof HTMLOptionElement){
                if(target[i].selected === false)
                    continue;
                else
                    array.push(new JsonObject(target[i].parentElement.name,target[i].value))
            }else{
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
            result += '"' + array[i].name + '":"' + array[i].value + '"' ;
            if(i !== array.length - 1)
                result += ",";
        }
        result += "}"
        //alert(result)
        return result;
    }


    function _getJSONParsed(array){
        let jsonData = array
        if(array.constructor.name !== "Array")
            jsonData = _getFormValues(array)
        jsonData = _getJSON(jsonData);
        return JSON.parse(jsonData)
    }

    return {
        getFormValues : _getFormValues,
        createJSONArray : _createJSONArray,
        getJSON : _getJSON,
        getJSONParsed : _getJSONParsed
    }
    })();

export class JsonObject{
    constructor(name,value){
        this.name = name;
        this.value = value
    }
}

export default JsonService;