export const appendSelectElement = (selectCity,text,value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = text;
    selectCity.appendChild(option)

}