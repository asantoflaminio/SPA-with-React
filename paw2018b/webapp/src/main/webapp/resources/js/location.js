function setProvince(element){
	document.getElementById("provinceOfCity").value = element.value;
}

function setCity(element){
	document.getElementById("cityOfNeighborhood").value = element.value;
}

function setNeighborhood(element){
	document.getElementById("neighborhood").value = element.value;
}

function showCitiesAdmin(element){
	$( "select[name='selectCity']" ).hide()
	if(element.value == -1)
		document.getElementById("defaultSelectCity").style.display = "inline"
	else
		document.getElementById(element.value).style.display = "inline"

}

function showCities(element){
	$( "select[name='selectCity']" ).hide()
	if(element.value == -1)
		document.getElementById("defaultSelectCity").style.display = "inline"
	else
		document.getElementById("province_" + element.value).style.display = "inline"

	$( "select[name='selectNeighborhood']" ).hide()
	document.getElementById("defaultSelectNeighborhood").style.display = "inline"
	document.getElementById("neighborhood").value = "";
	document.getElementById("cityOfNeighborhood").value = "";

}

function showNeighborhoods(element){
	$( "select[name='selectNeighborhood']" ).hide()
	if(element.value == -1)
		document.getElementById("defaultSelectNeighborhood").style.display = "inline"
	else
		document.getElementById("city_" + element.value).style.display = "inline"

	document.getElementById("neighborhood").value = "";
}

