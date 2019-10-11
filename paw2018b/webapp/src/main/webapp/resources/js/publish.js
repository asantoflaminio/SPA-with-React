function chargeSelect(){
	$( "select[name='selectCity']" ).hide()
	$( "select[name='selectNeighborhood']" ).hide()
	document.getElementById("defaultSelectCity").style.display = "inline"
	document.getElementById("defaultSelectNeighborhood").style.display = "inline"
}

/*
function alertValues(){
	alert("Province: " + document.getElementById("provinceOfCity").value)
	alert("City: " + document.getElementById("cityOfNeighborhood").value)
	alert("Neighborhood: " + document.getElementById("neighborhood").value)
}*/