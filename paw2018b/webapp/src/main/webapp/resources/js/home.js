/* Gives color to Buy or Rent buttons */

//String operation;
var operation = "FOR RENT";

$(document).ready(function() {
	$('.search_list-item').bind("click", function(e){
        var fieldset = $(this).parent()[0];
        var index = 0;
        if(this.getElementsByTagName("label")[0].innerHTML == "Comprar" || this.getElementsByTagName("label")[0].innerHTML == "Buy")
        	index = 0;
        else
        	index = 1;	
        color(index);
    });
	
	var list = document.getElementsByClassName("search_list-container")[0];
	var listlength = 2;
		
	for (i = 0; i < listlength; i++) {
		var element = list.children[i];
		if(element.getElementsByTagName("input")[0].checked == true)
			element.style.backgroundColor = "#fd8907";
	}
});

function color(index) {
	var list = document.getElementsByClassName("search_list-container")[0];
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

function chargeParameter(){
	document.getElementById("propertyType").value = "House";
}

function updateInputType(type){
	document.getElementById("propertyType").value = type;
}

function operation_sel(op){
	console.log("I got: " + op.valueOf());
	operation = op;
}

$(document).ready(function() {
	$("#divErrorSignIn").delay(5000).hide(1000);
});
