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
        <link rel="shortcut icon" href="
        <c:url value="/resources/pics/favicon.ico" />
        ">
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/details.css" />
        ">
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/navbar.css" />
        ">
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/footer.css" />
        ">
        <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
                <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>

    <body>
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
           			    <a class="user_dropdown" href="<c:url value="/logout"/>"><spring:message code="nav.logOut"/></a>
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
			<a href="<c:url value="#"/>" onclick="goBack(${sent})"><spring:message code="details.goBack"/></a>
		</div>
		
		<c:set var = "sentVar" scope = "session" value = "${sent}"/>
    <c:if test="${sentVar == 'true'}">
		  <div class="notice" id="divMessageSent">
            <div class="msg-sent-container">
              <p id='msg-sent'><spring:message code="details.msgSent"/></p> 
            </div>
          </div>
    </c:if>
    <c:if test="${errorLogin == 'true'}">
          <div class="notice" id="divErrorSignIn">
            <div class="msg-sent-container">
                <p id='msg-sent'><spring:message code="signUp.signInError"/></p> 
              </div>
          </div>
    </c:if>
        
        <div id="cols">
         <div id="left-col">   
         <div class="polaroid">       
          <div class="w3-content w3-display-container" style="max-width:800px">
          <c:if test="${not empty pageContext.request.userPrincipal && userLoggedEmail != sellerEmail}">
            <c:if test="${isFaved == false}">
              <c:url value="/favPublication" var="postFav"/>
              <form:form action="${postFav}" method="POST">
                <input type="hidden" name="publicationid"/>
                <img class="favorite-icon pointer" id="${publicationid}" onclick="submitFav(this);" src="<c:url value="/resources/pics/heart.png"/>" alt="Fave">
              </form:form>
            </c:if>
            <c:if test="${isFaved == true}">
              <c:url value="/unfavPublication" var="postFav"/>
              <form:form action="${postFav}" method="POST">
                <input type="hidden" name="publicationid"/>
                <img class="favorite-icon pointer" id="${publicationid}" onclick="submitFav(this);" src="<c:url value="/resources/pics/heart_filled.png"/>" alt="Fave">
              </form:form>
            </c:if>
          </c:if>
          
          <div class="size_div" id="imageDiv_${publicationid}" currentImage="0">
				<c:choose>
					<c:when test="${myImages[0].imageid >= 0}">
						<img class="mySlides" src="<c:url value="/imagesByUpload/${fn:escapeXml(myImages[0].imageid)}" />">
					</c:when>    
					<c:otherwise>
						<img class="mySlides" src="<c:url value="/resources/pics/default.jpg" />">
					</c:otherwise>
				</c:choose>	
          </div>

          <div style="display:none" id="imagesIDs_${publicationid}">
            <c:forEach var="row" varStatus="status" items="${myImages}" step="1" begin="0">
                    <p><c:out value="${row.imageid}"/></p>
            </c:forEach>
          </div>

			  
			  <div class="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style="width:100%">
          <c:if test="${amountImages > 1}">
  			    <div class="w3-left w3-hover-text-khaki" onclick="getPreviousImage('${publicationid}')">&#10094;</div>
  			    <div class="w3-right w3-hover-text-khaki" onclick="getNextImage('${publicationid}')">&#10095;</div>
          </c:if>

			  </div>
			</div>
		  <div class="container">
		    <p class="direction"><c:out value = "${address}"/>, <c:out value = "${neighborhood.neighborhood}"/>, <c:out value = "${city.city}"/>, <c:out value = "${province.province}"/></p>
		  </div>
		</div>
		
		<div class="polaroid_overview">
		  <div class="container4">
		     <p class="polaroid_title"><spring:message code="details.overview"/></p>
		     <p class="agency_text"><spring:message code="details.bedrooms"/><c:out value="${bedrooms}"/></p>
		     <p class="agency_text"><spring:message code="details.bathrooms"/><c:out value="${bathrooms}"/></p>
		     <p class="agency_text"><spring:message code="details.floorSize"/><c:out value="${floorSize}"/> m2</p>
		     <p class="agency_text"><spring:message code="details.parking"/><c:out value="${parking}"/> <spring:message code="details.vehicles"/></p>
		  </div>
		</div>
		</div>
		
		<div id="right-col">
		<div class="polaroid_price">
		  <div class="container2">
		    <div class="price_text">
		    	<p id="rent_sale" style="text-transform: uppercase"><spring:message code="details.price"/></p> 
		    	<p id="price_tag"><c:out value="${price}"/></p>
		  	</div>
		  </div>
		</div>
		
		<div class="polaroid_agency">
		  <div class="container3">
		     <p class="agency_text_contact"><spring:message code="details.contact"/></p>
		     <div id="tel-container">
		     	<p class="tel-text"><spring:message code="details.tel"/></p>
		     	<p class="tel-num"><c:out value="${phoneNumber}"/></p>
		     </div>
		     <c:url value="/detailsSend?publicationid=${fn:escapeXml(publicationid)}" var="postPath"/>
			<form:form modelAttribute="MessageForm" action="${postPath}" method="post">
		     	<div class="fillers">
				     <form:label cssClass="contact-title" path="name"><spring:message code="details.name"/></form:label>
				     <spring:message code="details.placeholderName" var="detailsName"/>
		    		 <form:input type="text" path="name" id="name" name="name" placeholder="${detailsName}" />
		    		 <form:errors path="name" cssClass="error" element="p"/>
		    		 
		    		 
		    		 <form:label cssClass="contact-title" path="email"><spring:message code="details.email"/></form:label>
                     <spring:message code="details.placeholderEmail" var="detailsEmail"/>
                     <form:input path="email" name="contactEmail" type="text" placeholder="${detailsEmail}"/>
                     <form:errors path="email" cssClass="error" element="p"/>
		    		 
		    		 <form:label cssClass="contact-title" path="message" for="message"><spring:message code="details.message"/></form:label>
		    		 <spring:message code="details.placeholderMessage" var="detailsMessage"/>
		    		 <form:input id="message" path="message" placeholder="${detailsMessage}"/>
		    		 <form:errors path="message" cssClass="error" element="p"/>
		    		 
		    		 <input type="hidden" value="${fn:escapeXml(sellerEmail)}" name="emailSeller">
		    		 
		    		 <spring:message code="details.contactButton" var="submitValue"/>
		    		 <input class="button-contact" type="submit" value="${submitValue}">
	    		 </div>
	    	</form:form>
		  </div>
		</div>
		</div>
		</div>

		
		<div class="polaroid_des">
		  <div class="container">
		  	<p class="polaroid_title"><c:out value="${title}"/></p>
		    <p class="agency_text"><c:out value="${description}"/></p>
		  </div>
		</div>
	
		
         <footer>

		  
          <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          </div>
        </footer>
        <script src="<c:url value="/resources/js/details.js" />"></script>
        <script src="<c:url value="/resources/js/imageManager.js" />"></script>
        <script src="<c:url value="/resources/js/navbar.js" />"></script>
    </body>
</html>
