<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>
<html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>MeinHaus</title>
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/list.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/navbar.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/footer.css" />">
        <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
        <link rel="shortcut icon" href="<c:url value="/resources/pics/favicon.ico" />">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="<c:url value="/resources/js/list.js" />"></script>
        <script src="<c:url value="/resources/js/navbar.js" />"></script>
        <script src="<c:url value="/resources/js/imageManager.js" />"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    
    <body onload="chargeParameters('${fn:escapeXml(address)}','${fn:escapeXml(operation)}', '${fn:escapeXml(propertyType)}','${fn:escapeXml(minPrice)}','${fn:escapeXml(maxPrice)}', '${fn:escapeXml(minFloorSize)}', '${fn:escapeXml(maxFloorSize)}','${fn:escapeXml(bedrooms)}', '${fn:escapeXml(bathrooms)}', '${fn:escapeXml(parking)}','${fn:escapeXml(page)}', '${fn:escapeXml(order)}')">       
        <nav>
        	<a href="<c:url value="/"/>">
           		<img src="<c:url value="/resources/pics/Logo4.png" />" alt="Home" id="logo">
            </a>
            <c:if test="${empty pageContext.request.userPrincipal}">
            <div class="dropdown" id="sign_in">
                <a class="navbar_item" href="<c:url value="#"/>" onclick="showSignIn()"><spring:message code="nav.signIn"/></a>
                <c:url value="/PrincipalLogin" var="loginUrl" />
				<form:form action="${loginUrl}" method="POST" class="form_login"  enctype="application/x-www-form-urlencoded">
                <div class="dropdown-content-p dropdown-padding get-this">
                        <div class="email">
                        	<spring:message code="nav.placeholderEmail" var="navEmail"/>
                            <input class="form-control form-control-lg form-control-borderless" type="email" placeholder="${navEmail}" name="j_username">
                        </div>
                        <div class="password">
                        	<spring:message code="nav.placeholderPassword" var="navPassword"/>
                            <input class="form-control form-control-lg form-control-borderless" type="password" placeholder="${navPassword}" name="j_password">
                        </div>
                        <div class="msg_error">
                        	<label></label>
                        </div>
                        <div class="check_box">
                            <label><input type="checkbox" name="j_rememberme" /><spring:message code="nav.rememberMe"/></label>
                        </div>
                        <div class="sign_b">
                            <input type="submit" class="btn" value="<spring:message code="nav.buttonSignIn"/>" >
                        </div>

                </div>
                </form:form>
            </div>
            <div>
                <a class="navbar_item" id="sign_up" href="<c:url value="./signUp"/>"><spring:message code="nav.signUp"/></a>
            </div>
            </c:if>
            <c:if test="${not empty pageContext.request.userPrincipal}">
            <div>
            	<div class="dropdown">
            	    <a class="navbar_item" id="userName" href="<c:url value="#"/>"><c:out value="${pageContext.request.userPrincipal.name}" /></a>
           			<div class="dropdown-content" id="profile_dropdown">
           			<sec:authorize access="hasRole('ADMIN')">
                        <a class="user_dropdown" href="<c:url value="./admin/adminMainPage"/>"><spring:message code="nav.principal"/></a>
                    </sec:authorize>
          				<a class="user_dropdown" href="<c:url value="./profile"/>"><spring:message code="nav.myProfile"/></a>
           			    <a class="user_dropdown" href="<c:url value="./logout"/>"><spring:message code="nav.logOut"/></a>
           			</div>
           		</div>
            </div>
            <sec:authorize access="! hasRole('LOCKED')">
                <div>
                    <a class="navbar_item" id="publish" href="<c:url value="./publish"/>"><spring:message code="nav.publish"/></a>
                </div>
            </sec:authorize>
            </c:if>
        </nav>
        
        <div class="breadcrumb">
			<a href="<c:url value="/"/>"><spring:message code="signUp.goBack"/></a>
		</div>
		
			<c:if test="${errorLogin == 'true'}">
	           	<div class="notice" id="divErrorSignIn">
	         		<div class="msg-sent-container">
	            		<p id='msg-sent'><spring:message code="signUp.signInError"/></p> 
	           		</div>
	            </div>
	        </c:if>
        
		<div class="wrap">
           <div class="search_list">
		  	 <fieldset class="search_list-container rounded">
				   <div class="search_list-item" id="buy" onclick="updateInputsOperation('FSale'); submitOperation('${operation}','FSale');">
				       <p class="search_list-item-label"><spring:message code="home.buy"/></p>
				   	   <c:url value="/list" var="postPath"/>
		  			   <form:form action="${postPath}" method="post" id="FSaleForm">
		  			   	   <input type="hidden" name="propertyType"/>
		  			   	   <input type="hidden" name="minPrice"/>
		  			   	   <input type="hidden" name="maxPrice"/>
		  			   	   <input type="hidden" name="minFloorSize" />
				   		   <input type="hidden" name="maxFloorSize" />
		   				   <input type="hidden" name="bedrooms"/>
		   				   <input type="hidden" name="address"/>
		   				   <input type="hidden" name="bathrooms"/>
		   				   <input type="hidden" name="parking" />
		   				   <input type="hidden" name="order"/>
						   <input type="hidden" name="operation" id="Fsale" class="buyrent-btn"/>
					    </form:form>
    		       </div>
    		       <div class="search_list-item" id="rent" onclick="updateInputsOperation('FRent') ; submitOperation('${operation}','FRent');">
    		           <p class="search_list-item-label"><spring:message code="home.rent"/></p>
    		       	   <c:url value="/list" var="postPath"/>
		  			   <form:form action="${postPath}" method="post" id="FRentForm">
		  			    <input type="hidden" name="propertyType"/>
		  			    <input type="hidden" name="minPrice"/>
		  			   	<input type="hidden" name="maxPrice"/>
		  			   	<input type="hidden" name="minFloorSize" />
				  		<input type="hidden" name="maxFloorSize" />
		   				<input type="hidden" name="bedrooms"/>
		   				<input type="hidden" name="bathrooms"/>
		   				<input type="hidden" name="address"/>
		   				<input type="hidden" name="parking" />
		   				<input type="hidden" name="order"/>
    	    	 	  	<input type="hidden" type="submit" name="operation" id="Frent" class="buyrent-btn"/>
    	    	 	  </form:form>
				   </div>
			 </fieldset>
		   </div>
		   
		   <c:url value="/list" var="postPath"/>
		   <form:form modelAttribute="homeSearchForm" onsubmit="checkAddress()" action="${postPath}" method="post">
		   <input type="hidden" name="operation"/>
		   <input type="hidden" name="propertyType"/>
		   <input type="hidden" name="minPrice"/>
		   <input type="hidden" name="maxPrice"/>
		   <input type="hidden" name="minFloorSize" />
		   <input type="hidden" name="maxFloorSize" />
		   <input type="hidden" name="bedrooms"/>
		   <input type="hidden" name="bathrooms"/>
		   <input type="hidden" name="parking" />
		   <input type="hidden" name="order"/>

		   <div class="search">
		   	<c:url value="/list" var="postPath"/>
			<form:form action="${postPath}" id="propertyTypeForm" method="post">
		   	  <select class="type-home-select" id="propertyType" onchange="updateInputPropertyType(this.value)">
					 	<option value="House"><spring:message code="home.house"/></option>
	  				 	<option value="Apartment"><spring:message code="home.apartment"/></option>
  		   	  </select>
           </form:form>
		   	  <spring:message code="list.placeholderSearch" var="title"/>
		   	  <spring:message code="list.searchBtn" var="searchbtn"/>
		      <form:input path="address" type="text" class="searchTerm" placeholder="${title}" oninput="updateCheckInput(this)"/>
		      <input type="submit" id="search-btn" value="${searchbtn}">
		   </div>
		   	  <form:errors path="address" cssClass="error" element="p"/>
           </form:form>
           
		</div>

		<input type="hidden" id="checkSearch"/>


		<div id="results-container">
			<div class="results" id="res">
	        	<c:set var = "pubLength" scope = "session" value = "${publicationsLength}"/>
				<c:if test = "${pubLength > 1 || pubLength == 0}">
					<h3 id="res-title"><c:out value="${pubLength}"/> <spring:message code="list.resultsTitle"/></h3>	
				</c:if>		
				<c:if test = "${pubLength == 1}">
					<h3 id="res-title"><c:out value="${pubLength}"/> <spring:message code="list.resultsTitleOne"/></h3>	
				</c:if>			
			</div>
			<div class="results" id="order">
				<c:url value="/list" var="postPath"/>
		   		<form:form action="${postPath}" method="post" id="orderForm" >
					<select id="order-select" onchange="updateOrderInputs(this.value);submitOrder()" >
						<option value="No order"></option>
						<option value="Ascending order"><spring:message code="list.lowest"/></option>
						<option value="Descending order"><spring:message code="list.highest"/></option>
						<option value="Newest publications"><spring:message code="list.newest"/></option>
						<option value="Oldest publications"><spring:message code="list.oldest"/></option>
						<input type="hidden" name="address"/>
						<input type="hidden" name="operation"/>
						<input type="hidden" name="propertyType"/>
					    <input type="hidden" name="minPrice"/>
					    <input type="hidden" name="maxPrice"/>
					    <input type="hidden" name="minFloorSize" />
				   		<input type="hidden" name="maxFloorSize" />
					    <input type="hidden" name="bedrooms"/>
					    <input type="hidden" name="bathrooms"/>
					    <input type="hidden" name="parking" />
					    <input type="hidden" name="order"/>
					</select>
				</form:form>
				
				<h3 id="order-title"><spring:message code="list.orderTitle"/></h3>
			</div>
		</div>

    	<div class="filters">
    		<ul id="applied-filters-list">

    		<li class="applied-filters-list-item hidden" id="filterLocation">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
		  		   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn">
				   <p class="applied-filter-text" id="filterLocationText"></p>
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterMinPrice">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
		  		   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn">
				   <p class="applied-filter-text" id="filterMinPriceText"></p>U$S
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterMaxPrice">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
				   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn">
				   <p class="applied-filter-text" id="filterMaxPriceText"></p>U$S
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterMinFloorSize">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
				   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn">
				   <p class="applied-filter-text" id="filterMinFloorSizeText"></p>m2
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterMaxFloorSize">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
				   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn">
				   <p class="applied-filter-text" id="filterMaxFloorSizeText"></p>m2
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterBedroom">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
				   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn"/>
				   <p class="applied-filter-text" id="filterBedroomText"><spring:message code="list.bedroomsMinus"/></p>
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterBathroom">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address" id="addressCheck"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
				   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn"/>
				   <p class="applied-filter-text" id="filterBathroomText"><spring:message code="list.bathroomsMinus"/></p>
			   </form:form>
			  </li>
			  <li class="applied-filters-list-item hidden" id="filterParking">
			   <c:url value="/list" var="postPath"/>
			   <form:form action="${postPath}" method="post" class="delete-input">
				   <input type="hidden" name="address"/>
				   <input type="hidden" name="operation"/>
				   <input type="hidden" name="propertyType"/>
				   <input type="hidden" name="minPrice"/>
		  		   <input type="hidden" name="maxPrice"/>
		  		   <input type="hidden" name="minFloorSize" />
				   <input type="hidden" name="maxFloorSize" />
				   <input type="hidden" name="bedrooms"/>
				   <input type="hidden" name="bathrooms"/>
				   <input type="hidden" name="parking" />
				   <input type="hidden" name="order"/>
				   <input value="x" type="submit" onclick="deleteFilter(this,'${minPrice}','${maxPrice}', '${minFloorSize}', '${maxFloorSize}')" class="delete-btn"/>
				   <p class="applied-filter-text" id="filterParkingText"><spring:message code="list.parking"/></p>
			   </form:form>
			  </li>
			</ul>
    	</div>
    	
    	<div>
    	<div id="content-container">
    		<aside>    		
			    <div class="polaroid">
					<div class="container">
					<div id="filters-title">
						<h3><spring:message code="list.filters"/></h3>
					</div>
						<div id="filters-list">
						<c:set var = "locationCounter" scope = "session" value = "0"/>
					  	<c:if test="${fn:length(locationMap) > 1 && pubLength != 1}">
					  		<div class="filters-list-item"><spring:message code="list.location"/><img src="<c:url value="/resources/pics/arrow_up.png" />" alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img></div>
								<div class="expandible filters-list-item-last">
										<c:forEach var="locationEntry" items="${locationMap}">
										 <c:if test="${locationEntry.value != pubLength}">
											<c:url value="/list" var="postPath"/>
											<form:form action="${postPath}" method="post">
												<div class="radioFlexOption">
													<input type="hidden" name="address"/>
												    <input type="hidden" name="operation"/>
												    <input type="hidden" name="propertyType"/>
												    <input type="hidden" name="minPrice"/>
										  		    <input type="hidden" name="maxPrice"/>
										  		    <input type="hidden" name="minFloorSize" />
				  						  			<input type="hidden" name="maxFloorSize" />
										  		    <input type="hidden" name="bathrooms"/>
												    <input type="hidden" name="order"/>
													<input type="hidden" name="bedrooms"/>
													<input type="hidden" name="parking" />
														<a class="filters-item-name" href="<c:url value="#"/>" onclick="submitLocation(this,'${locationEntry.key}')">
															<c:out value="${locationEntry.key}"/>
															(<c:out value="${locationEntry.value}"/>)
														</a>
												</div>
											</form:form>
										 </c:if>	
										</c:forEach>
					  			</div>
					  	</c:if>
					  		<div class="filters-list-item"><spring:message code="list.price"/><img src="<c:url value="/resources/pics/arrow_up.png" />" alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img></div>
					  			<div class="expandible">
					  				<c:url value="/list" var="postPath"/>
		  			   				<form:form action="${postPath}" method="post" id="priceForm">
					  					<div class="slidecontainer">
					  					  <input type="hidden" name="address"/>
				   						  <input type="hidden" name="operation"/>
				   						  <input type="hidden" name="propertyType"/>
				   						  <input type="hidden" name="minFloorSize" />
				  						  <input type="hidden" name="maxFloorSize" />
				  						  <input type="hidden" name="bedrooms"/>
				  						  <input type="hidden" name="bathrooms"/>
				  						  <input type="hidden" name="order"/>
				  						  <input type="hidden" name="parking" />
					  					  <p class="filter-subtitle"><spring:message code="list.min"/> <spring:message code="list.dollars"/></p>
										  <input type="text" name = "minPrice" id="minPriceInput" oninput="checkNumberInput(this)" onchange="checkPrice()">

										  <p class="filter-subtitle filter-subtitle-not-first"><spring:message code="list.max"/> <spring:message code="list.dollars"/></p>
										  <input type="text" name="maxPrice" id="maxPriceInput" oninput="checkNumberInput(this)" onchange="checkPrice()">
										  <p class="error hidden" id="errorPrice"><spring:message code="list.errorPrice"/></p>
										  <p class="error hidden" id="errorPriceNumber"><spring:message code="list.errorPriceNumber"/></p>
										  
										  <div class="apply-container">
											  <button type="button" class="apply-btn" onclick="submitPrice()"><spring:message code="list.apply"/></button>
										  </div>
										</div>
                        			</form:form>
					  			</div>
					  		<div class="filters-list-item"><spring:message code="list.floorSizeTitle"/><img src="<c:url value="/resources/pics/arrow_up.png" />" alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img></div>
					  			<div class="expandible">
					  				<c:url value="/list" var="postPath"/>
		  			   				<form:form action="${postPath}" method="post" id="floorSizeForm">
					  					<div class="slidecontainer">
					  					  <input type="hidden" name="address"/>
				   						  <input type="hidden" name="operation"/>
				   						  <input type="hidden" name="propertyType"/>
				   						  <input type="hidden" name="minPrice"/>
				   						  <input type="hidden" name="maxPrice"/>
				  						  <input type="hidden" name="bedrooms"/>
				  						  <input type="hidden" name="bathrooms"/>
				  						  <input type="hidden" name="order"/>
				  						  <input type="hidden" name="parking" />
					  					  <p class="filter-subtitle"><spring:message code="list.min"/> <spring:message code="list.sqMeters"/></p>
										  <input type="text" name = "minFloorSize" id="minFloorSizeInput" oninput="checkNumberInput(this)" onchange="checkFloorSize()">

										  <p class="filter-subtitle filter-subtitle-not-first"><spring:message code="list.max"/> <spring:message code="list.sqMeters"/></p>
										  <input type="text" name="maxFloorSize" id="maxFloorSizeInput" oninput="checkNumberInput(this)" onchange="checkFloorSize()">
										  <p class="error hidden" id="errorFloorSize"><spring:message code="list.errorPrice"/></p>
										  <p class="error hidden" id="errorFloorSizeNumber"><spring:message code="list.errorPriceNumber"/></p>
										  
										  <div class="apply-container">
											  <button type="button" class="apply-btn" onclick="submitFloorSize()"><spring:message code="list.apply"/></button>
										  </div>
										</div>
                        			</form:form>
					  			</div>

					  	<c:if test="${fn:length(bedroomsMap) > 1}">
					  		<div class="filters-list-item"><spring:message code="list.bedrooms"/><img src="<c:url value="/resources/pics/arrow_up.png" />" alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img></div>
								<div class="expandible filters-list-item-last">
										<c:forEach var="bedroomEntry" items="${bedroomsMap}">
											<c:url value="/list" var="postPath"/>
											<form:form action="${postPath}" method="post">
												<c:if test="${bedroomEntry.key == 1}">
														<spring:message code="list.bedroomMinus" var="bedroomOption"/>
												</c:if>
												<c:if test="${bedroomEntry.key != 1}">
														<spring:message code="list.bedroomsMinus" var="bedroomOption"/>
												</c:if>
												<div class="radioFlexOption">
													<input type="hidden" name="address"/>
												    <input type="hidden" name="operation"/>
												    <input type="hidden" name="propertyType"/>
												    <input type="hidden" name="minPrice"/>
										  		    <input type="hidden" name="maxPrice"/>
										  		    <input type="hidden" name="minFloorSize" />
				  						  			<input type="hidden" name="maxFloorSize" />
										  		    <input type="hidden" name="bathrooms"/>
												    <input type="hidden" name="order"/>
													<input type="hidden" name="bedrooms"/>
													<input type="hidden" name="parking" />
														<a class="filters-item-name" href="<c:url value="#"/>" onclick="submitBedroom(this,'${bedroomEntry.key}')">
															<c:out value="${bedroomEntry.key}"/>
															<c:out value="${bedroomOption}"/>
															(<c:out value="${bedroomEntry.value}"/>)
														</a>
												</div>
											</form:form>
										</c:forEach>	
					  			</div>
					  	</c:if>

					  	<c:if test="${fn:length(bathroomsMap) > 1}">
						<div class="filters-list-item"><spring:message code="list.bathrooms"/><img src="<c:url value="/resources/pics/arrow_up.png" />" alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img></div>
								<div class="expandible filters-list-item-last">
										<c:forEach var="bathroomEntry" items="${bathroomsMap}">
											<c:url value="/list" var="postPath"/>
											<form:form action="${postPath}" method="post">
												<c:if test="${bathroomEntry.key == 1}">
														<spring:message code="list.bathroom" var="bathroomOption"/>
												</c:if>
												<c:if test="${bathroomEntry.key != 1}">
														<spring:message code="list.bathroomsMinus" var="bathroomOption"/>
												</c:if>
												<div class="radioFlexOption">
													<input type="hidden" name="address"/>
												    <input type="hidden" name="operation"/>
												    <input type="hidden" name="propertyType"/>
												    <input type="hidden" name="minPrice"/>
										  		    <input type="hidden" name="maxPrice"/>
										  		    <input type="hidden" name="minFloorSize" />
				  						  			<input type="hidden" name="maxFloorSize" />
										  		    <input type="hidden" name="bedrooms"/>
												    <input type="hidden" name="order"/>
													<input type="hidden" name="bathrooms" />
													<input type="hidden" name="parking" />
														<a class="filters-item-name" href="<c:url value="#"/>" onclick="submitBathroom(this,'${bathroomEntry.key}')">
															<c:out value="${bathroomEntry.key}"/>
															<c:out value="${bathroomOption}"/>
															(<c:out value="${bathroomEntry.value}"/>)
														</a>
												</div>
											</form:form>
										</c:forEach>	
					  			</div>
					  	</c:if>

					  	<c:if test="${fn:length(parkingMap) > 1}">
							<div class="filters-list-item"><spring:message code="list.parkings"/><img src="<c:url value="/resources/pics/arrow_up.png" />" alt="Arrow Up" onclick="expand(this);" class="arrow-up-filters"></img></div>
									<div class="expandible filters-list-item-last">
											<c:forEach var="parkingEntry" items="${parkingMap}">
												<c:url value="/list" var="postPath"/>
												<form:form action="${postPath}" method="post">
													<c:if test="${parkingEntry.key == 1}">
															<spring:message code="list.parking" var="parkingOption"/>
													</c:if>
													<c:if test="${parkingEntry.key != 1}">
															<spring:message code="list.parkingMinus" var="parkingOption"/>
													</c:if>
													<div class="radioFlexOption">
														<input type="hidden" name="address"/>
													    <input type="hidden" name="operation"/>
													    <input type="hidden" name="propertyType"/>
													    <input type="hidden" name="minPrice"/>
											  		    <input type="hidden" name="maxPrice"/>
											  		    <input type="hidden" name="minFloorSize" />
				  						  				<input type="hidden" name="maxFloorSize" />
											  		    <input type="hidden" name="bedrooms"/>
													    <input type="hidden" name="order"/>
														<input type="hidden" name="bathrooms" />
														<input type="hidden" name="parking" />
															<a class="filters-item-name" href="<c:url value="#"/>" onclick="submitParking(this,'${parkingEntry.key}')">
																<c:out value="${parkingEntry.key}"/>
																<c:out value="${parkingOption}"/>
																(<c:out value="${parkingEntry.value}"/>)
															</a>
													</div>
												</form:form>
											</c:forEach>	
						  			</div>
						</c:if>
					  			<!--
						</div>
						 <c:url value="/list" var="postPath"/>
		  				 <form:form action="${postPath}">
							<div class="apply-container">
									<input type="hidden" name="operation"/>
									<input type="hidden" name="address"/>
									<input type="hidden" name="minPrice"/>
		  			   				<input type="hidden" name="maxPrice"/>
		  			 				<input type="hidden" name="bedrooms"/>
		  			 				<input type="hidden" name="bathrooms"/>
		  			 				<input type="hidden" name="order"/>
		  			 				<spring:message code="list.apply" var="apply"/>
	                        		<input type="submit" class="apply-btn" value="${apply}"/>
						    </div>	
					    </form:form>
					</div>
					-->
				</div>
			</aside>
			
	        <section id="publications">
	        
	        	<c:set var = "listLength" scope = "session" value = "${publicationsLength}"/>
	        	<c:set var = "maxLength" scope = "session" value = "10"/>
	        	<c:set var = "page" scope = "session" value = "${page}"/>
	        	<c:set var = "current" scope = "session" value = "1"/>
	        	
	        	<c:forEach var="row" varStatus="status" items="${publications}" step="1" begin="${0}">
	        		<c:if test = "${current <= maxLength}">
	        			<c:set var = "current" scope = "session" value = "${current+1}"/>
						<div class="polaroid-property" id = "publication_<c:out value = "${row.publicationid}"/>" >
				    		<div class="img-with-tag" id="imageDiv_${row.publicationid}" currentImage="0">
								<c:choose>
									<c:when test="${row.images[0].imageid >= 0}">
										<img class="polaroid-property-img" src="<c:url value="/imagesByUpload/${row.images[0].imageid}" />">
									</c:when>    
									<c:otherwise>
										<img class="polaroid-property-img" src="<c:url value="/resources/pics/default.jpg" />">
									</c:otherwise>
								</c:choose>				   		 		<c:if test="${not empty pageContext.request.userPrincipal && pageContext.request.userPrincipal.name != row.user.email}">
				   		 		 <c:set var = "isFaved" scope = "session" value = "false"/>
				   		 		 <c:forEach var="rowFav" varStatus="status" items="${favPublications}">
				   		 		  <c:if test="${row.publicationid == rowFav.publicationid}">
				   		 		  	<c:set var = "isFaved" scope = "session" value = "true"/>
					    		 	<c:url value="/unfavPublication" var="postFav"/>
									<form:form action="${postFav}" method="POST">
									<input type="hidden" name="publicationid"/>
					    			<img class="favorite-icon" id="<c:out value='${row.publicationid}'/>" onclick="submitFav(this);" src="<c:url value="/resources/pics/heart_filled.png"/>" alt="Fave">
					    			</form:form>
					    		  </c:if>
					    		 </c:forEach>
					    		 <c:if test="${isFaved == false}">
					    		 	<c:url value="/favPublication" var="postFav"/>
									<form:form action="${postFav}" method="POST">
									<input type="hidden" name="publicationid"/>
					    			<img class="favorite-icon" id="<c:out value='${row.publicationid}'/>" onclick="submitFav(this);" src="<c:url value="/resources/pics/heart.png"/>" alt="Fave">
					    			</form:form>
					    		 </c:if>
					    		</c:if>
				   		 		<c:if test = "${fn:length(row.images) > 1}">
				    			<img class="next-image pointer" onclick="getNextImage('${row.publicationid}', 'polaroid-property-img')" src="<c:url value="/resources/pics/arrow_right.png" />" alt="Next">
				    			<img class="prev-image pointer" onclick="getPreviousImage('${row.publicationid}', 'polaroid-property-img')" src="<c:url value="/resources/pics/arrow_left.png" />" alt="Previous">
				    			</c:if>
								<h2 class="price-tag">U$S <c:out value = "${row.price}"/></h2>
							</div>
							<div style="display:none" id="imagesIDs_${row.publicationid}">
								<c:set var="maxLengthImages" value = "${fn:length(row.images)}" />
								<c:set var="currentImage" value = "0" />
					            <c:forEach var="image" varStatus="status" items="${row.images}" step="1" begin="0">
					                  <c:if test = "${currentImage < maxLengthImages}">
					                    <p><c:out value="${image.imageid}"/></p>
					                    <c:set var="currentImage" value = "${currentImage + 1}" />
					                 </c:if>
					            </c:forEach>
				            </div>
							<div class="property-container">
								<div class="first-column">								
								<div class="property-title-container">
									<h3 class="property-title"><c:out value = "${row.title}"/></h3>
									<h4 class="address"><c:out value = "${row.address}"/>, <c:out value = "${row.neighborhood.neighborhood}"/>, <c:out value = "${row.city.city}"/>, <c:out value = "${row.province.province}"/></h4>
								</div>					
							
								<div class="property-characteristics">
								
									<div class="column-1">
										<c:if test = "${row.bedrooms > 1 || row.bedrooms == 0}">
											<h4 class="bedroom"><strong><c:out value = "${row.bedrooms}"/></strong> <spring:message code="list.bedroomMinus"/></h4>
										</c:if>
										<c:if test = "${row.bedrooms == 1}">
											<h4 class="bedroom"><strong><c:out value = "${row.bedrooms}"/></strong> <spring:message code="list.bedroom"/></h4>
										</c:if>
										
										<c:if test = "${row.bathrooms > 1 || row.bathrooms == 0}">
											<h4><strong><c:out value = "${row.bathrooms}"/></strong> <spring:message code="list.bathroomsMinus"/></h4>
										</c:if>
										<c:if test = "${row.bathrooms == 1}">
											<h4><strong><c:out value = "${row.bathrooms}"/></strong> <spring:message code="list.bathroom"/></h4>
										</c:if>
										
										<c:if test = "${row.parking > 1 || row.parking == 0}">
											<h4><strong><c:out value = "${row.parking}"/></strong> <spring:message code="list.parkingMinus"/></h4>	
										</c:if>
										<c:if test = "${row.parking == 1}">
											<h4><strong><c:out value = "${row.parking}"/></strong> <spring:message code="list.parking"/></h4>	
										</c:if>					
									</div>
									<div class="column-2">
										<c:if test = "${row.floorSize > 1 || row.floorSize == 0}">
											<h4><strong><c:out value = "${row.floorSize}"/></strong> <spring:message code="list.floorSizeMinus"/></h4>
										</c:if>
										<c:if test = "${row.floorSize == 1}">
											<h4><strong><c:out value = "${row.floorSize}"/></strong> <spring:message code="list.floorSize"/></h4>	
										</c:if>	
										
										<c:if test="${fn:escapeXml(operation) == 'FSale'}">  		
							    		  <h4><spring:message code="list.operationSale"/></h4>
							    		</c:if> 
							    		<c:if test="${fn:escapeXml(operation) == 'FRent'}">  		
							    		  <h4><spring:message code="list.operationRent"/></h4>
							    		</c:if>
									</div>				
								</div>
								</div>
								<div class="second-column">

							    <div class="pub-date">
							    	<spring:message code="list.publicationDate"/>
							    	<spring:message code="list.publicationDateInitial"/>
									<script>
								    getDate('${fn:substring(row.publicationDate, 0, 10)}');
								    </script>
								    <spring:message code="list.publicationDateFinal"/>
								</div>
								<div class="more-info">
									<a class="more-info-title" href="<c:url value="details?publicationid=${fn:escapeXml(row.publicationid)}"/>"><spring:message code="list.moreInfo"/> ></a>
								</div>	
								</div>
							</div>
						</div>
					</c:if>
				</c:forEach>
		       
	        </section>

	        

			<c:set var = "maxPageDouble" scope = "session" value = "${listLength/maxLength}"/>
	        <fmt:formatNumber var="maxPageInteger" value="${maxPageDouble + (maxPageDouble % 1 == 0 ? 0 : 0.5)}" type="number" pattern="#" />
	        <c:set var = "PaginationLength" scope = "session" value = "5"/>
	        <c:set var = "maxPage" scope = "session" value = "${maxPageInteger}"/>
	        
	        <c:if test="${page == maxPage}">
	       		<c:set var = "nextPage" scope = "session" value = "${maxPage}"/>
	       	</c:if>
	       	
	        <c:if test="${page != maxPage}">
	      	  <c:if test="${listLength > maxLength}">
	       		<c:set var = "nextPage" scope = "session" value = "${page + 1}"/>
	       		<!--<h2>${maxPage}</h2>-->
	       		</c:if>
	       	</c:if>
	       	
	        <c:if test="${page == 1}">
	       		<c:set var = "previousPage" scope = "session" value = "1"/>
	       	</c:if>
	        <c:if test="${page != 1}">
	       		<c:set var = "previousPage" scope = "session" value = "${page - 1}"/>
	       	</c:if>
	        
	        <c:if test="${listLength == 0}">	        
	 	       <div id="no-results">
					<h2 id="no-results-title"><spring:message code="list.noResultsTitle"/></h2>
					<h3 id="no-results-info"><spring:message code="list.noResultsInfo"/></h3>
				</div>
	        </c:if>

	       	<c:set var = "startPagination" scope = "session" value = "${3}"/>
	       	
	       	
	       	<c:choose>
			  <c:when test="${page == 1}">
			    <c:set var = "initial" scope = "session" value = "1"/>
			    <c:if test="${page + 4 <= maxPage}">
			    	<c:set var = "end" scope = "session" value = "${page + 4}"/>
			    </c:if>
			    <c:if test="${page + 4 > maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${maxPage}"/>
			    </c:if>
			  </c:when>
			  <c:when test="${page == 2}">
			    <c:set var = "initial" scope = "session" value = "1"/>
			    <c:if test="${page + 3 <= maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${page + 3}"/>
			    </c:if>
			    <c:if test="${page + 3 > maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${maxPage}"/>
			    </c:if>
			  </c:when>
			  <c:when test="${page == 3}">
			    <c:set var = "initial" scope = "session" value = "1"/>
			    <c:if test="${page + 2 <= maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${page + 2}"/>
			    </c:if>
			    <c:if test="${page + 2 > maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${maxPage}"/>
			    </c:if>
			  </c:when>
			  <c:when test="${page == 4}">
			    <c:set var = "initial" scope = "session" value = "2"/>
			    <c:if test="${page + 2 <= maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${page + 2}"/>
			    </c:if>
			    <c:if test="${page + 2 > maxPage}">	
			    	<c:set var = "end" scope = "session" value = "${maxPage}"/>
			    </c:if>
			  </c:when>
			  <c:when test="${page == maxPage}">
			    <c:set var = "initial" scope = "session" value = "${page - 4}"/>
			    <c:set var = "end" scope = "session" value = "${maxPage}"/>
			  </c:when>
			  <c:when test="${page == maxPage - 1}">
			    <c:set var = "initial" scope = "session" value = "${page - 3}"/>
			    <c:set var = "end" scope = "session" value = "${maxPage}"/>
			  </c:when>
			  <c:otherwise>
			    <c:set var = "initial" scope = "session" value = "${page - 2}"/>
			    <c:set var = "end" scope = "session" value = "${page + 2}"/>
			  </c:otherwise>
			</c:choose>
			
			
<!--		maxPageInteger = ${maxPageInteger}
			Initial = ${initial}
			End = ${end}
			Page = ${page}
			startPagination = ${startPagination} -->
			

	       	</div>
	       	<c:if test="${listLength != 0}">
	       		<c:if test="${listLength <= maxLength}">
	 	      		<div class="page-nums-container">
						<div class="page-nums">
							<a class="page-number" href="<c:url value="list?operation=${fn:escapeXml(operation)}&address=${fn:escapeXml(address)}&page=${previousPage}&price=${fn:escapeXml(price)}&bedrooms=${fn:escapeXml(bedrooms)}"/>">&laquo;</a>
							<c:set var="counter" value="1"/>
							<a class="page-number" id="${counter}" href="<c:url value="list?operation=${fn:escapeXml(operation)}&address=${fn:escapeXml(address)}&page=${counter}&price=${fn:escapeXml(price)}&bedrooms=${fn:escapeXml(bedrooms)}"/>">${counter}</a>
							<c:set var="counter" value="${counter+1}"/>
 							<a class="page-number" href="<c:url value="list?operation=${fn:escapeXml(operation)}&address=${fn:escapeXml(address)}&page=${nextPage}&price=${fn:escapeXml(price)}&bedrooms=${fn:escapeXml(bedrooms)}"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>

	       		<c:if test="${listLength > maxLength}">
		        	<div class="page-nums-container">
						<div class="page-nums">
								<a class="page-number toRefresh" href="<c:url value="page=${previousPage}"/>">&laquo;</a>
								<c:if test="${page > startPagination}">
									<a class="page-number toRefresh" href="<c:url value="page=1"/>">1</a>
									<a class="page-number toRefresh" href="<c:url value="page=${page - 3}"/>">...</a>
								</c:if>
							<c:set var="counter" value="${initial}"/>
							<c:forEach begin="${initial}" end="${end}" varStatus="loop">
								<a class="page-number toRefresh" id="${counter}" href="<c:url value="page=${counter}"/>">${counter}</a>
								<c:set var="counter" value="${counter+1}"/>
							</c:forEach>
							<c:if test="${page < maxPage - 3}">
								<a class="page-number toRefresh" href="<c:url value="&page=${page + 3}"/>">...</a>
								<a class="page-number toRefresh" href="<c:url value="&page=${maxPage}"/>"><c:out value="${maxPage}" /></a>
							</c:if>
 							<a class="page-number toRefresh" href="<c:url value="page=${nextPage}"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>	        
			</c:if>	        
        </div>
        
       	<div id="separator">
        </div>

        
        <footer>
          <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          </div>
        </footer>
      	
    </body>
    
</html>
