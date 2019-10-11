<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>
<html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <title>MeinHaus</title>
        
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/home.css" />
        ">
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/navbar.css" />
        ">
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/footer.css" />
        ">
        <link rel="shortcut icon" href="<c:url value="/resources/pics/favicon.ico" />">
        <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="<c:url value="/resources/js/home.js" />"></script>
        <script src="<c:url value="/resources/js/navbar.js" />"></script>
        <script src="<c:url value="/resources/js/imageManager.js" />"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    
    <body onload="chargeParameter()">
        <nav>
        	<a href="<c:url value="/"/>">
           		<img src="<c:url value="/resources/pics/Logo4.png" />" alt="Home" id="logo">
            </a>
            <c:if test="${empty pageContext.request.userPrincipal}">
            <div class="dropdown" id="sign_in">
                <a class="navbar_item" href="<c:url value="#"/>" onclick="showSignIn()"><spring:message code="nav.signIn"/></a>
                <c:url value="/PrincipalLogin" var="loginUrl" />
				<form:form action="${loginUrl}" method="POST" class="form_login"  enctype="application/x-www-form-urlencoded">
                <div class="dropdown-content-p dropdown-padding get-this" id="sign-in">
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
        
        <header>
            <div class="header" style="background-image:url(<c:url value='/resources/pics/background5.png'/>)">
                <sec:authorize access="hasRole('LOCKED')">
                    <div class="lockedDiv">
                        <p><spring:message code="admin.userLocked"/></p>
                    </div>
                </sec:authorize>
                <div class="title">
                    <h1><spring:message code="home.title"/></h1>
                </div>
                <c:url value="/homeSearch" var="postPath"/>
				<form:form modelAttribute="homeSearchForm" action="${postPath}" method="post">
                <div class="search_list">
                	<fieldset class="search_list-container rounded">
                			<div class="search_list-item selected" id="buy">
                        		<input value="FSale" type="radio" name="operation" checked><label id="buy-label"><spring:message code="home.buy"/></label>
                        	</div>
                			<div class="search_list-item" id="rent">
                        		<input value="FRent" type="radio" name="operation"><label id="rent-label"><spring:message code="home.rent"/></label>
                    		</div>
                    </fieldset>
                </div>
                <div id="icons">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-12 col-md-10 col-lg-8">
                                <form id="card" class="card card-sm">
                                    <div class="card-body row no-gutters">
                                        <div class="col-auto">
                                            <i class="fas fa-search h4 text-body"></i>
                                        </div>
                                        <!--end of col-->
                                        <div class="col">
                                            <spring:message code="home.house" var="house"/>
                                            <spring:message code="home.apartment" var="apartment"/>
                                        	<select class="type-home-select" onchange="updateInputType(this.value)">
				 								<option value="House"><spring:message code="home.house"/></option>
  				 								<option value="Apartment"><spring:message code="home.apartment"/></option>
  		   	  								</select>
                                            <input type="hidden" name="propertyType" id="propertyType"/>
                                        	<spring:message code="home.placeholderSearch" var="search"/>
	                                    	<form:input path="address" class="form-control form-control-lg" type="search" id="input_search" placeholder="${search}"/>
	                                   	</div>
                                        <!--end of col-->
                                        <div class="col-auto">
                                            <spring:message code="home.searchBtn" var="searchbtn"/>
                                            <input id="searchbutton" class="btn btn-lg rounded" type="submit" value="${searchbtn}">
                                        </div>
                                        <!--end of col-->
                                    </div>
                                    <form:errors path="address" cssClass="error" element="p"/>
                                </form>
                            </div>
                            <!--end of col-->
                        </div>
                    </div>
                </div>
                </form:form>
                <c:if test="${errorLogin == 'true'}">
	           		<div class="notice" id="divErrorSignIn">
	         		   <div class="msg-sent-container">
	            		  <p id='msg-sent'><spring:message code="signUp.signInError"/></p> 
	           		   </div>
	              </div>
	            </c:if>
            </div>
            

        </header>
        <c:set var="maxResults" value="${8}"/>
        <section class="newest_homes">
	        <c:set var = "listLengthSale" scope = "session" value = "${fn:length(publicationsSale)}"/>
        	<c:if test = "${listLengthSale != 0}">
                <div>
                    <h3><spring:message code="home.newestTitleFSale"/></h3>
                </div>
            	<c:if test = "${listLengthSale < maxResults}">
    	       		<c:set var = "loopEndSale" scope = "session" value = "${listLengthSale}"/>
            	</c:if>
            	<c:if test = "${listLengthSale >= maxResults}">
            		<c:set var = "loopEndSale" scope = "session" value = "${maxResults}"/>
            	</c:if>
            	<div>
                    <ul id="newest-homes-fsale" class="newest-homes-list">
                        <c:forEach var="row" varStatus="status" items="${publicationsSale}" step="1" begin="0" end="${loopEndSale}">
                        <li class="polaroid">
                            <div id="imageDiv_${row.publicationid}" class="arrows-div" currentImage="0">
								<c:choose>
									<c:when test="${row.images[0].imageid >= 0}">
										<img class="polaroid-property-img" src="<c:url value="/imagesByUpload/${row.images[0].imageid}" />">
									</c:when>    
									<c:otherwise>
										<img class="polaroid-property-img" src="<c:url value="/resources/pics/default.jpg" />">
									</c:otherwise>
								</c:choose>		
								<c:if test = "${fn:length(row.images) > 1}">
				    			<img class="next-image" onclick="getNextImage('${row.publicationid}', 'polaroid-property-img')" src="<c:url value="/resources/pics/arrow_right.png" />" alt="Next">
				    			<img class="prev-image" onclick="getPreviousImage('${row.publicationid}', 'polaroid-property-img')" src="<c:url value="/resources/pics/arrow_left.png" />" alt="Previous">
				    			</c:if>                            
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
                            <div class="line_separator"></div>
                            <div class="description_box">
                            	<label class="price">U$S <c:out value = "${row.price}"/></label>
    					  		<label  class="expenses"><c:out value = "${row.title}"/></label>
    					  		<label><c:out value = "${row.address}"/></label>
    					  		<a class="more-info" href="<c:url value="details?publicationid=${fn:escapeXml(row.publicationid)}"/>"><spring:message code="home.moreInfo"/></a>
                            </div>
                        </li>
                     </c:forEach>
                    </ul>
                </div>
            </c:if>
            
          <div class="color-fondo">
            
            <c:set var = "listLengthRent" scope = "session" value = "${fn:length(publicationsRent)}"/>
          	<c:if test = "${listLengthRent != 0}">
                <div>
                    <h3 id="newest-homes-second"><spring:message code="home.newestTitleFRent"/></h3>
                </div>
            	<c:if test = "${listLengthRent < maxResults}">
    	       		<c:set var = "loopEndRent" scope = "session" value = "${listLengthRent}"/>
            	</c:if>
            	<c:if test = "${listLengthRent >= maxResults}">
            		<c:set var = "loopEndRent" scope = "session" value = "${maxResults}"/>
            	</c:if>
            	<div>
                    <ul id="newest-homes-frent" class="newest-homes-list">
    	       		<c:forEach var="row" varStatus="status" items="${publicationsRent}" step="1" begin="0" end="${loopEndRent}">
                        <li class="polaroid">
                            <div id="imageDiv_${row.publicationid}" class="arrows-div" currentImage="0">
								<c:choose>
									<c:when test="${row.images[0].imageid >= 0}">
										<img class="polaroid-property-img" src="<c:url value="/imagesByUpload/${row.images[0].imageid}" />">
									</c:when>    
									<c:otherwise>
										<img class="polaroid-property-img" src="<c:url value="/resources/pics/default.jpg" />">
									</c:otherwise>
								</c:choose>		
								<c:if test = "${fn:length(row.images) > 1}">
				    				<img class="next-image" onclick="getNextImage('${row.publicationid}', 'polaroid-property-img')" src="<c:url value="/resources/pics/arrow_right.png" />" alt="Next">
				    				<img class="prev-image" onclick="getPreviousImage('${row.publicationid}', 'polaroid-property-img')" src="<c:url value="/resources/pics/arrow_left.png" />" alt="Previous">
				    			</c:if>  
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
                            <div class="line_separator"></div>
                            <div class="description_box">
                            	<label class="price">U$S <c:out value = "${row.price}"/></label>
    					  		<label  class="expenses"><c:out value = "${row.title}"/></label>
    					  		<label><c:out value = "${row.address}"/></label>
    					  		<a class="more-info" href="<c:url value="details?publicationid=${fn:escapeXml(row.publicationid)}"/>"><spring:message code="home.moreInfo"/></a>
                            </div>
                        </li>
                     </c:forEach>
                    </ul>
                </div>
            </c:if>
           </div>
        </section>
        
        <section class="contact-info">
        	<div class="contact-info-column">
        		<h4><spring:message code="home.popular"/></h4>
        		<ul>
        			<li>Belgrano</li>
        			<li>Palermo</li>
        			<li>Recoleta</li>
        			<li>Caballito</li>
        		</ul>
        	</div>
        	<div class="contact-info-column">
        	    <h4><spring:message code="home.searchBy"/></h4>
        	    <ul>
        			<li><spring:message code="home.neighborhood"/></li>
        			<li><spring:message code="home.price"/></li>
        			<li><spring:message code="home.numberOfRooms"/></li>
        			<li><spring:message code="home.pets"/></li>
        		</ul>
        	</div>
        	<div class="contact-info-column">
          		<h4><spring:message code="home.contactUs"/></h4>
        		<ul>
        			<li><spring:message code="home.help"/></li>
        			<li><spring:message code="home.FAQs"/></li>
        			<li><spring:message code="home.contact"/></li>
        			<li><spring:message code="home.support"/></li>
        		</ul>
           	</div>
        </section>
        
        
        <footer>
          <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          </div>
        </footer>
        
    </body>
</html>
