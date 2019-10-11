function selectContainer(option,pagePub,pageFav){
	if(option == "myPublications"){
		showPublications()
	}
	else if(option == "myFavourites"){
		showFavourites();
	}else
        showData();
    var paginationPub = document.getElementById(pagePub + "_publications")
    var paginationFav = document.getElementById(pageFav + "_favourites")

    if(paginationPub != null)
        paginationPub.classList.add("actualPage");

    if(paginationFav != null)
        paginationFav.classList.add("actualPage");
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

function showData() {
    // Declare variables
    var dat, pub, fav;
    var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}
    
    rm = document.getElementById("Publications");
    rm.style.display = "none";
    
    fav = document.getElementById("Favourites");
    fav.style.display = "none";
    
    dat = document.getElementById("Data");
    dat.style.display = "block";
    document.getElementById("dat").setAttribute("class", "current");
}

function showPublications() {
    // Declare variables
    var dat, pub, fav;
    var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}
    
    dat = document.getElementById("Data");
    dat.style.display = "none";
    
    fav = document.getElementById("Favourites");
    fav.style.display = "none";
    
    pub = document.getElementById("Publications");
    pub.style.display = "block";
    document.getElementById("pub").setAttribute("class", "current"); 
}

function showFavourites() {
    // Declare variables
    var dat, pub, fav;
    var curr = document.getElementsByClassName("current")[0];
    if(curr === undefined);else{curr.removeAttribute("class", "current");}
    
    dat = document.getElementById("Data");
    dat.style.display = "none";
    
    pub = document.getElementById("Publications");
    pub.style.display = "none";
    
    fav = document.getElementById("Favourites");
    fav.style.display = "block";
    document.getElementById("fav").setAttribute("class", "current"); 
}

function submitFavv(element){
	var publicationid = element.getAttribute("id");
	$( "input[name='publicationid']" ).attr("value",publicationid);
	element.parentNode.submit();
}

function closePopUp(){
    $("#popup").hide();
}

function setDeleteid(page,pubid){
    $("#popup").show();
    document.getElementById("accept").setAttribute("href","profileDelete?page=" + page + "&pubid=" + pubid);
}

function setEdit(editButton,publicationid){
    $( "input[name='publicationid']" ).attr("value",publicationid);
    editButton.parentElement.submit();
}