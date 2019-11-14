export const appendSelectElement = (selectCity,text,value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = text;
    selectCity.appendChild(option)

}

export const decidePlural = (information,value) => {
    if((value > 1 || value === 0) && information != "")
        return information + "s";
    else
        return information;
}