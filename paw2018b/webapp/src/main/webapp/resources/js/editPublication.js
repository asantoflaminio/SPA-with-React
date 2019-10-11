function chargeParameters(operation,propertyType,provinceid,cityid,neighborhoodid,provinceName,cityName,neighborhoodName){
	if(operation == "FSale")
		document.getElementById("FSale").checked = true;
	else
		document.getElementById("FRent").checked = true;

	if(propertyType == "House")
		document.getElementById("House").checked = true;
	else
		document.getElementById("Apartment").checked = true;

	$( "select[name='selectCity']" ).hide()
	$( "select[name='selectNeighborhood']" ).hide()

	var provinceSelect = document.getElementById("selectProvince")
	var citySelect = document.getElementById("province_" + provinceid)
	var neighborhoodSelect = document.getElementById("city_" + cityid)

	document.getElementById("provinceOfCity").value = provinceid;
	document.getElementById("cityOfNeighborhood").value = cityid;
	document.getElementById("neighborhood").value = neighborhoodid;

	provinceSelect.value = provinceid
	provinceSelect.innetText = provinceName

	if(provinceid == -1)
		document.getElementById("defaultSelectCity").style.display = "inline"
	else{
		citySelect.style.display = "inline"
		citySelect.value = cityid
		citySelect.innetText = cityName
	}
	if(cityid == -1)
		document.getElementById("defaultSelectNeighborhood").style.display = "inline"
	else{
		neighborhoodSelect.style.display = "inline";
		neighborhoodSelect.value = neighborhoodid;
		neighborhoodSelect.innetText = neighborhoodName;
	}

}