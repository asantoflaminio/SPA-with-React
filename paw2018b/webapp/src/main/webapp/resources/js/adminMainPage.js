var DaysEnum = Object.freeze({"LOCATION":"location", "USERS":"users", "PUBLICATIONS":"publications"})

function startUp(option,pageUsers,pagePub){
	selectSection(option)
	$( "select[name='selectCity']" ).hide()
	document.getElementById("defaultSelectCity").style.display = "inline"

	var paginationPub = document.getElementById(pagePub + "_publications")
    var paginationUser = document.getElementById(pageUsers + "_users")

    if(paginationPub != null)
        paginationPub.classList.add("actualPage");

    if(paginationUser != null)
        paginationUser.classList.add("actualPage");
}

function selectSection(option){
	hideAllSections()
	if(option == DaysEnum.LOCATION){
		showLocationSection()
	}else if(option == DaysEnum.USERS){
		showUsersSection()
	}else{
		showPublicationsSection()
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

function hideAllSections(){
	$("#location").hide()
	$("#users").hide()
	$("#publications").hide()
}

function showLocationSection(){
	hideAllSections()
	$("#location").show()
    var curr = document.getElementsByClassName("current")[0];
    curr.removeAttribute("class", "current");
    document.getElementById("loc").classList.add("current")
}

function showUsersSection(){
	hideAllSections()
	$("#users").show()
	var curr = document.getElementsByClassName("current")[0];
    curr.removeAttribute("class", "current");
    document.getElementById("usr").classList.add("current")
}

function showPublicationsSection(){
	hideAllSections()
	$("#publications").show()
    var curr = document.getElementsByClassName("current")[0];
    curr.removeAttribute("class", "current");
    document.getElementById("pub").classList.add("current")
}

function checkAdminInput(inputElement){
	var value = inputElement.value;
	var length = value.length;
	var lettersAndSpacesPattern = /^[a-zA-Z ]+$/;
	var lastInputChar = value[length - 1];
	if(! lastInputChar.match(lettersAndSpacesPattern)){
		inputElement.value = value.substring(0,length - 1)
	}
	if(value.length > 40){
		inputElement.value = value.substring(0,40)
	}
}

function submitBlockUser(userid,status,pageUsers){
	document.getElementById("useridBlock").value = userid;
	document.getElementById("userstatusBlock").value = status;
	document.getElementById("pageUsersBlock").value = pageUsers;
	document.getElementById("blockUserForm").submit();
}

function submitBlockPublication(publicationid,status,pagePub){
	document.getElementById("publicationidBlock").value = publicationid;
	document.getElementById("publicationstatusBlock").value = status;
	document.getElementById("pagePublicationBlock").value = pagePub;
	document.getElementById("blockPublicationForm").submit();
}