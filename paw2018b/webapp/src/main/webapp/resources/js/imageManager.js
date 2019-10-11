var endPoint = "/imagesByUpload/"
var endPointDeploy = "/paw-2018b-10/imagesByUpload/"
var classListPage = "polaroid-property-img"

function getNextImage(publicationid, classAdd, favourite){
	var divImage
	var divimagesIDs
	if(favourite != null){
		divImage = document.getElementById("imageDiv_favourite" + publicationid);
		divimagesIDs = document.getElementById("imagesIDs_favourite" + publicationid);
	}else{
		divImage = document.getElementById("imageDiv_" + publicationid);
		divimagesIDs = document.getElementById("imagesIDs_" + publicationid);
	}
	divImage.setAttribute("imagesSize",divimagesIDs.getElementsByTagName("p").length)
	var imagesSize = divImage.getAttribute("imagesSize");
	var currentImageNumber = parseInt(divImage.getAttribute("currentImage"));
	var nextImageNumber;
	if(imagesSize - 1 == currentImageNumber)
		nextImageNumber = 0;
	else
		nextImageNumber = currentImageNumber + 1;

	var imageID = divimagesIDs.getElementsByTagName("p")[nextImageNumber].innerHTML;
	var img = document.createElement("img");
	img.setAttribute("src", endPointDeploy + imageID);
	if(classAdd == null){
		img.style.height = "100%";
		img.style.width = "100%";
	}else{
		img.classList.add(classAdd)
	}
	

	var imageTag = divImage.getElementsByTagName("img")[0]
	divImage.replaceChild(img,imageTag)
	divImage.setAttribute("currentImage", nextImageNumber)
}

function getPreviousImage(publicationid, classAdd){
	var divImage = document.getElementById("imageDiv_" + publicationid);
	var divimagesIDs = document.getElementById("imagesIDs_" + publicationid);
	divImage.setAttribute("imagesSize",divimagesIDs.getElementsByTagName("p").length)
	var imagesSize = divImage.getAttribute("imagesSize");
	var currentImageNumber = parseInt(divImage.getAttribute("currentImage"));
	var nextImageNumber;
	if(currentImageNumber == 0)
		nextImageNumber = imagesSize - 1;
	else
		nextImageNumber = currentImageNumber - 1;

	var imageID = divimagesIDs.getElementsByTagName("p")[nextImageNumber].innerHTML;
	var img = document.createElement("img");
	img.setAttribute("src", endPointDeploy + imageID);

	if(classAdd == null){
		img.style.height = "100%";
		img.style.width = "100%";
	}else{
		img.classList.add(classAdd)
	}
	
	var imageTag = divImage.getElementsByTagName("img")[0]
	divImage.replaceChild(img,imageTag)
	divImage.setAttribute("currentImage", nextImageNumber)
}