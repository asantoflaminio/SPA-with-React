import defaultBlack from '../resources/blackDefault.png'

export const appendSelectElement = (selectCity,text,value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = text;
    selectCity.appendChild(option)

}

export const decidePlural = (informationSingular,informationPlural,value) => {
    if(value > 1 || value === 0)
        return informationPlural;
    else
        return informationSingular;
}

export const decideOperation = (buy,rent,value) => {
    if(value === "FSale")
        return buy;
    else
        return rent;
}

export const setSRC = (base64) => {
    if(base64 != "")
        return "data:image/png;base64," + base64;
    else
        return defaultBlack;
}

export const getNextImage = (publicationID, element, index) => {
    alert(element)
    
}