		var slideIndex = 1;
		showDivs(slideIndex);
		
		
		function plusDivs(n) {
		  showDivs(slideIndex += n);
		}
		
		function currentDiv(n) {
		  showDivs(slideIndex = n);
		}
		
		function showDivs(n) {
		  
		  var i;
		  var x = document.getElementsByClassName("mySlides");
		  var dots = document.getElementsByClassName("demo");
		  if (n > x.length) {slideIndex = 1}    
		  if (n < 1) {slideIndex = x.length}
		  for (i = 0; i < x.length; i++) {
		     x[i].style.display = "none";  
		  }
		  for (i = 0; i < dots.length; i++) {
		     dots[i].className = dots[i].className.replace(" w3-white", "");
		  }
		  x[slideIndex-1].style.display = "block";  
		}



	$(document).ready(function() {
    	$("#divMessageSent").delay(5000).hide(1000);
	});

	function goBack(sent) {
    if(sent == true){
    	window.history.go(-2);
    }else{
    	window.history.back();
    }
}

function submitFav(element){
	var publicationid = element.getAttribute("id");
	$( "input[name='publicationid']" ).attr("value",publicationid);
	element.parentNode.submit();
}

$(document).ready(function() {
	$("#divErrorSignIn").delay(5000).hide(1000);
});
