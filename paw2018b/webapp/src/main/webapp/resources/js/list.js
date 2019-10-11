$(document).ready(function() {
	$('.buyrent-btn').bind("click", function(e){
        var fieldset = $(this).parent()[0];
        var index = 0;
        if(this.getElementsByTagName("label")[0].innerHTML == "Comprar" || this.getElementsByTagName("label")[0].innerHTML == "Buy")
        	index = 0;
        else
        	index = 1;	
        color(index);
    });
	
	$('.page-number').bind("click", function(e){
        var num = this.innerHTML;
        changeSelectedPage(num);
    });
});

function changeSelectedPage(index) {
	var pub = document.getElementById("publications").children;
	
	for(i = 0; i < pub.length; i++){
		pub[i].style.display = "none";
	}
}

function getDate(value){
	var parts = value.split('-');
	var pubDate = new Date(parts[0], parts[1] - 1, parts[2]);
	var pubDateMs = pubDate.getTime(); 
	var actualDate = new Date();
	var actualDateMs = actualDate.getTime();
	var msInDay = 1000*60*60*24;
	document.write(Math.floor((actualDateMs - pubDateMs) / msInDay));
}

function color(index) {
	var list = document.getElementsByClassName("buyrent-btn");
	var listlength = 2;
		
	for (i = 0; i < listlength; i++) { 
		var element = list.children[i];
		element.classList.remove("selected");
		if (i == index) {
			element.classList.add("selected");
			element.style.backgroundColor = "#fd8907";
			element.onmouseover = function() {
			    this.style.backgroundColor = "#fd8907";
			}
			element.onmouseleave = function() {
				this.style.backgroundColor = "#fd8907";
			}
			element.getElementsByTagName("input")[0].checked = true;
		} else {
			element.style.backgroundColor = 'rgb(' + 200 + ',' + 200 + ',' + 200 + ')';
			element.onmouseover = function() {
			    this.style.backgroundColor = "#fecc94";
			}
			element.onmouseleave = function() {
				this.style.backgroundColor = 'rgb(' + 200 + ',' + 200 + ',' + 200 + ')';

			}
		}
	}
}


/* Changes heart icon according to the one that corresponds */
function fav(heart){
	if (heart.src.includes("heart_filled"))
		heart.src = "/resources/pics/heart.png";
	else
		heart.src = "/resources/pics/heart_filled.png";
}






/* Expands a section of the filter list */
function expand(arrow){
	if (arrow.src.includes("arrow_up")) {
		arrow.src = "/paw-2018b-10/resources/pics/arrow_down.png";
		arrow.parentElement.nextElementSibling.style.display = "block";
	} else {
		arrow.src = "/paw-2018b-10/resources/pics/arrow_up.png";
		arrow.parentElement.nextElementSibling.style.display = "none";
	}
}

/* Searches and shows (if it's necessary) the message error */
function search(operation) {
	var input_search = document.getElementById("search_input");
	
	if(input_search.value === ""){
		
	//no hay nada, no hago nada
		
	}	else if(/[^a-zA-Z]/.test(input_search.value)){
		//habria q mostrar error
		//var msg = document.getElementById('msg_error_search');
		//msg.innerHTML = 'Wrong format'; //Tal vez habria que permitir otras cosas en el formato pero chequear ojo con sql injection
		//msg.style.display = "block";
	} else {
		
		//document.getElementById("link").href="./list?input=" + input_search.value + "&operation=" + operation;
		window.location.href = "./list?input=" + input_search.value + "&operation=" + operation;
	}
}

/* Remove search filters */
function deleteFilter(filter,minPrice,maxPrice, minFloorSize, maxFloorSize){
	var filterId = filter.parentElement.parentElement.getAttribute("id")
	if(filterId == "filterMinPrice"){
		updateInputsPrice("", maxPrice)
	}else if(filterId == "filterMaxPrice"){
		updateInputsPrice(minPrice, "")
	}else if(filterId == "filterMinFloorSize"){
		updateInputsFloorSize("", maxFloorSize)
	}else if(filterId == "filterMaxFloorSize"){
		updateInputsFloorSize(minFloorSize, "")
	}else if(filterId == "filterBedroom"){
		updateInputsBedroom("");
	}else if(filterId == "filterBathroom"){
		updateInputsBathrooms("");
	}else if(filterId == "filterParking"){
		updateInputsParking("");
	}else if(filterId == "filterLocation"){
		updateInputsSearch("");
	}
}


function submitOperation(oldOperation,operation){ 
	if(oldOperation == operation)
		return;
	updateInputsPrice("","")
	updateInputsFloorSize("","")
	updateInputsBedroom("")
	updateInputsBathrooms("")
	updateInputsParking("")
	if( operation == "FSale")
		document.getElementById("FSaleForm").submit();
	else
		document.getElementById("FRentForm").submit();
}

function submitPrice(){
	if(checkPrice()){
		document.getElementById("priceForm").submit();
	}
}

function submitFloorSize(){
	if(checkFloorSize()){
		document.getElementById("floorSizeForm").submit();
	}
}

function submitOrder(){
	document.getElementById("orderForm").submit();
}

function submitLocation(element,value){
	updateInputsSearch(value)
	element.parentNode.parentNode.submit()
}

function submitBedroom(element,value){
	updateInputsBedroom(value)
	element.parentNode.parentNode.submit()
}

function submitBathroom(element,value){
	updateInputsBathrooms(value)
	element.parentNode.parentNode.submit()
}

function submitParking(element,value){
	updateInputsParking(value)
	element.parentNode.parentNode.submit()
}

function submitFav(element){
	var publicationid = element.getAttribute("id");
	$( "input[name='publicationid']" ).attr("value",publicationid);
	element.parentNode.submit();
}

function submitPropertyType(){
	document.getElementById("propertyTypeForm").submit();
}

function updateInputsBedroom(bedrooms){
	$( "input[name='bedrooms']" ).attr("value",bedrooms);
}

function updateInputsBathrooms(bathrooms){
	$( "input[name='bathrooms']" ).attr("value",bathrooms);
}

function updateInputsParking(parking){
	$( "input[name='parking']" ).attr("value",parking);
}

function updateInputsPrice(minPrice, maxPrice){
	var minInput = document.getElementById("minPriceInput")
	var maxInput = document.getElementById("maxPriceInput")

	$( "input[name='minPrice']" ).attr("value",minPrice);
	$( "input[name='maxPrice']" ).attr("value",maxPrice);
}

function updateInputsFloorSize(minFloorSize, maxFloorSize){
	var minInput = document.getElementById("minFloorSizeInput")
	var maxInput = document.getElementById("maxFloorSizeInput")

	$( "input[name='minFloorSize']" ).attr("value",minFloorSize);
	$( "input[name='maxFloorSize']" ).attr("value",maxFloorSize);
	var minInput = document.getElementById("minPriceInput")
	var maxInput = document.getElementById("maxPriceInput")
}

function updateInputsOperation(operation){
	$( "input[name='operation']" ).attr("value",operation);
}

function updateInputPropertyType(propertyType){
	$( "input[name='propertyType']" ).attr("value",propertyType);
}

function updateCheckInput(element){
	document.getElementById("checkSearch").value = element.value;
}

function updateInputsSearch(address){
	$( "input[name='address']" ).attr("value",address);
}

function checkAddress(){
	var address = $( "#checkSearch" ).val()
	if(! /^[a-zA-Z0-9, ]+$/.test(address) && address.length != 0){
		$( "input[name='address']" ).attr("value","");
		document.getElementsByClassName("searchTerm")[0].value = ".";
	}
}

function updateOrderInputs(order){
	var select = document.getElementById("order-select")
	if(order == "Ascending order")
		select.options[1].selected = true
	else if(order == "Descending order")
		select.options[2].selected = true
	else if(order == "Newest publications")
		select.options[3].selected = true
	else if(order == "Oldest publications")
		select.options[4].selected = true
	else
		select.options[0].selected = true
	$( "input[name='order']" ).attr("value",order);
}

function checkBedroomOptions(bedrooms){
	if(bedrooms != ""){
		$( "input[name='bedrooms']" ).attr("checked",true);
	}
}

function updatePropertyType(propertyType){
	var select = document.getElementById("propertyType")

	if(propertyType == "House"){
		select.selectedIndex = 0;
	}else
		select.selectedIndex = 1;
}

function checkBathroomOptions(bathrooms){
	if(bathrooms != ""){
		$( "input[name='bathrooms']" ).attr("checked",true);
	}
}

function checkPrice(){
	var minInput = document.getElementById("minPriceInput")
	var maxInput = document.getElementById("maxPriceInput")
	var minPrice = parseInt(minInput.value)
	var maxPrice = parseInt(maxInput.value)
	var error = document.getElementById("errorPrice")
	var errorNumber = document.getElementById("errorPriceNumber")

	errorNumber.style.display = "none"
	error.style.display = "none"

	if(! isNumberCheck(minInput.value) || ! isNumberCheck(maxInput.value)){
		errorNumber.style.display = "block"
		maxInput.style.border = "1px solid #ff0000"
		maxInput.style.color = "#ff0000"
		minInput.style.border = "1px solid #ff0000"
		minInput.style.color = "#ff0000"
		return false;
	}

	if((minPrice > maxPrice && minInput.value != "" && maxInput.value != "")){
		error.style.display = "block"
		maxInput.style.border = "1px solid #ff0000"
		maxInput.style.color = "#ff0000"
		minInput.style.border = "1px solid #ff0000"
		minInput.style.color = "#ff0000"
		return false;
	}

	error.style.display = "none"
	maxInput.style.color = "#878787"
	minInput.style.color = "#878787"
	minInput.style.border = "1px solid #878787"
	maxInput.style.border = "1px solid #878787"
	
	
	return true;
}

function checkFloorSize(){
	var minInput = document.getElementById("minFloorSizeInput")
	var maxInput = document.getElementById("maxFloorSizeInput")
	var minPrice = parseInt(minInput.value)
	var maxPrice = parseInt(maxInput.value)
	var error = document.getElementById("errorFloorSize")
	var errorNumber = document.getElementById("errorFloorSizeNumber")

	errorNumber.style.display = "none"
	error.style.display = "none"

	if(! isNumberCheck(minInput.value) || ! isNumberCheck(maxInput.value)){
		errorNumber.style.display = "block"
		maxInput.style.border = "1px solid #ff0000"
		maxInput.style.color = "#ff0000"
		minInput.style.border = "1px solid #ff0000"
		minInput.style.color = "#ff0000"
		return false;
	}

	if((minPrice > maxPrice && minInput.value != "" && maxInput.value != "")){
		error.style.display = "block"
		maxInput.style.border = "1px solid #ff0000"
		maxInput.style.color = "#ff0000"
		minInput.style.border = "1px solid #ff0000"
		minInput.style.color = "#ff0000"
		return false;
	}

	error.style.display = "none"
	maxInput.style.color = "#878787"
	minInput.style.color = "#878787"
	minInput.style.border = "1px solid #878787"
	maxInput.style.border = "1px solid #878787"
	
	
	return true;
}

function isNumberCheck(str){
	if(str == "")
		return true
	return /^[0-9]+$/.test(str)
}

function checkNumberInput(inputElement){
	var value = inputElement.value;
	var length = value.length;
	var lastInputChar = value[length - 1];
	if('0123456789'.indexOf(lastInputChar) == -1){
		inputElement.value = value.substring(0,length - 1)
	}
	if(value.length > 8){
		inputElement.value = value.substring(0,8)
	}
}

function updatePagination(address, propertyType, operation, minPrice, maxPrice, minFloorSize, maxFloorSize, bedrooms, bathrooms, parking, order){
	var pagination = document.getElementsByClassName("toRefresh");
	var actualHref;
	var href = "list?address=" + address + "&propertyType=" + propertyType + "&operation="+ operation + "&minPrice=" + minPrice + "&maxPrice=" + maxPrice +
				"&minFloorSize=" + minFloorSize + "&maxFloorSize=" + maxFloorSize + "&bedrooms=" + bedrooms + "&bathrooms=" + bathrooms +
				"&parking=" + parking + "&order=" + order + "&";
	var i;
	for(i = 0; i < pagination.length; i++){
		actualHref = pagination[i].getAttribute("href");
		pagination[i].setAttribute("href", href + actualHref);
	}
}

function chargeParameters(address,operation,propertyType,minPrice,maxPrice, minFloorSize, 
						  maxFloorSize,bedrooms,bathrooms,parking,page,order){
	updatePropertyType(propertyType)
	updateInputsSearch(address)
	updateInputsOperation(operation)
	updateInputPropertyType(propertyType)
	updateInputsBedroom(bedrooms)
	updateInputsBathrooms(bathrooms)
	updateOrderInputs(order)
	updateInputsPrice(minPrice,maxPrice)
	updateInputsFloorSize(minFloorSize,maxFloorSize)
	checkBedroomOptions(bedrooms)
	checkBathroomOptions(bathrooms)
	updateInputsParking(parking)
	updatePagination(address, propertyType, operation, minPrice, maxPrice, minFloorSize, 
					 maxFloorSize, bedrooms, bathrooms, parking, order);
	
	var filterLocation = document.getElementById("filterLocation")
	var filterMinPrice = document.getElementById("filterMinPrice")
	var filterMaxPrice = document.getElementById("filterMaxPrice")
	var filterMinFloorSize = document.getElementById("filterMinFloorSize")
	var filterMaxFloorSize = document.getElementById("filterMaxFloorSize")
	var filterBedroom = document.getElementById("filterBedroom")
	var filterBedroomText = document.getElementById("filterBedroomText")
	var filterBathroom = document.getElementById("filterBathroom")
	var filterBathroomText = document.getElementById("filterBathroomText")
	var filterParking = document.getElementById("filterParking")
	var filterParkingText = document.getElementById("filterParkingText")

	if(address == "")
		filterLocation.style.display = "none";
	else{
		document.getElementById("filterLocationText").innerText = address
		filterLocation.style.display = "inline-block";
	}


	if(minPrice == "")
		filterMinPrice.style.display = "none";
	else{
		document.getElementById("filterMinPriceText").innerText = "Min: " + minPrice
		filterMinPrice.style.display = "inline-block";	
	}

	if(maxPrice == "")
		filterMaxPrice.style.display = "none";
	else{
		document.getElementById("filterMaxPriceText").innerText = "Max: " + maxPrice
		filterMaxPrice.style.display = "inline-block";
	}

	if(minFloorSize == "")
		filterMinFloorSize.style.display = "none";
	else{
		document.getElementById("filterMinFloorSizeText").innerText = "Min: " + minFloorSize
		filterMinFloorSize.style.display = "inline-block";
	}

	if(maxFloorSize == "")
		filterMaxFloorSize.style.display = "none";
	else{
		document.getElementById("filterMaxFloorSizeText").innerText = "Min: " + maxFloorSize
		filterMaxFloorSize.style.display = "inline-block";
	}

	if(bedrooms == "")
		filterBedroom.style.display = "none";
	else{
		var actualText = filterBedroomText.innerText
		filterBedroomText.innerText = bedrooms + " " + actualText.replace(/\s+/g, '')
		filterBedroom.style.display = "inline-block";
	}

	if(bathrooms == "")
		filterBathroom.style.display = "none";
	else{
		var actualText = filterBathroomText.innerText
		filterBathroomText.innerText = bathrooms + " " + actualText.replace(/\s+/g, '')
		filterBathroom.style.display = "inline-block";
	}

	if(parking == "")
		filterParking.style.display = "none";
	else{
		var actualText = filterParkingText.innerText
		filterParkingText.innerText = parking + " " + actualText.replace(/\s+/g, '')
		filterParking.style.display = "inline-block";
	}

	var buy = document.getElementById("buy")
	var rent = document.getElementById("rent")

	if(operation == "FSale"){
		buy.style.backgroundColor = "#fd8907";
	}else{
		rent.style.backgroundColor = "#fd8907";
	}

	document.getElementById(page).classList.add("actualPage");
}	

$(document).ready(function() {
	$("#divErrorSignIn").delay(5000).hide(1000);
});

