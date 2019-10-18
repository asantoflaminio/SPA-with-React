export const getJSON = (array,quantity) => {
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