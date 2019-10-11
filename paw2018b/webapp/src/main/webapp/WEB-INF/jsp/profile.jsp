<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="UTF-8">
        <title>MeinHaus</title>
        <link rel="shortcut icon" href="<c:url value="/resources/pics/favicon.ico" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/profile.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/navbar.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/footer.css" />">
        <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="<c:url value="/resources/js/profile.js" />"></script>
        <script src="<c:url value="/resources/js/imageManager.js" />"></script>
                <script src="<c:url value="/resources/js/navbar.js" />"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>


		<body onload="selectContainer('${fn:escapeXml(option)}', '${fn:escapeXml(pagePub)}', '${fn:escapeXml(pageFav)}')">
        <nav>
        	<a href="<c:url value="/"/>">
           		<img src="<c:url value="/resources/pics/Logo4.png" />" alt="Home" id="logo">
            </a>
            <div class="dropdown">
	        	<img src="<c:url value="/resources/pics/user.png" />" alt="user" id="user_icon" class="navbar_item">
                <div id="myDropdown" class="dropdown-content"> 
                    <a href="<c:url value="./profile"/>"><spring:message code="nav.profile"/></a>
                    <a href="<c:url value="./logout"/>"><spring:message code="nav.logOut"/></a>
                </div>
            </div>
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
                
				<div id="popup">
        			<div id="popup-nav">
        				<p id="popup-nav-title">Delete</p>
        				<button id="popup-nav-close" onclick="closePopUp()">X</button>
        			</div>
        			<div id="popup-body">
        				<p id="popup-body-msg"><spring:message code="profile.deleteConfirmation"/></p>
        			</div>
        			<div id="popup-btn">
        				<a id="accept" ><spring:message code="profile.deleteConfirmationYes"/></a>
        				<a id="cancel" onclick="closePopUp()" href="<c:url value="#"/>"><spring:message code="profile.deleteConfirmationNo"/></a>
        			</div>
       			</div>                
        <aside>
      		<div class="leftcol">
	       		<ul>
	       		  <li id="pub" onclick="showPublications();"><a href="<c:url value="#"/>" ><spring:message code="profile.optionPublications"/></a></li>
		          <li id="dat" onclick="showData();"><a href="<c:url value="#"/>" ><spring:message code="profile.optionData"/></a></li>
		          <li id="fav" onclick="showFavourites();"><a href="<c:url value="#"/>" ><spring:message code="profile.optionFavourites"/></a></li>
	        	</ul>
      		</div>
		</aside>
      
		<section>
       		<div id="Data">
       	 	 	<div class="data polaroid">
        			<div class="title-container">       
	          			<h3><spring:message code="profile.titlePersonalData"/></h3>  
					</div>
					<c:url value="/profileData" var="postPath"/>
				 	<form:form modelAttribute="ProfileForm" action="${postPath}" method="post">
				 	<c:set var = "name" scope = "session" value = "${fn:escapeXml(firstNameValue)}"/>
				 	<c:set var = "surname" scope = "session" value = "${fn:escapeXml(lastNameValue)}"/>
				 	<c:set var = "oldEmail" scope = "session" value = "${fn:escapeXml(emailValue)}"/>
				 	<c:set var = "phone" scope = "session" value = "${fn:escapeXml(phoneNumberValue)}"/>
				 	<c:set var = "errorForm" scope = "session" value = "${fn:escapeXml(error)}"/>
						<div class="form">
							<div class="editdata-list-item">
	                        	<form:label path="firstName"><spring:message code="profile.firstName"/></form:label>
	                        	<spring:message code="profile.placeholderFirstName" var="firstName"/>
	                        	<form:input class="editdata-input" path="firstName" type="text" placeholder="${firstName}" name="firstName" value="${name}"/>
	                        	<form:errors path="firstName" cssClass="error" element="p"/>
	                        </div>
							<div class="editdata-list-item">
	                        	<form:label path="lastName"><spring:message code="profile.lastName"/></form:label>
	                        	<spring:message code="profile.placeholderLastName" var="lastName"/>
	                        	<form:input class="editdata-input" path="lastName" type="text" placeholder="${lastName}" name="lastName" value="${surname}"/>
	                        	<form:errors path="lastName" cssClass="error" element="p"/>
	                        </div>
							<div class="editdata-list-item">
	                        	<form:label path="email"><spring:message code="profile.email"/></form:label>
	                        	<spring:message code="profile.placeholderEmail" var="email"/>
	                        	<form:input class="editdata-input" path="email" type="text" placeholder="${email}" name="email" value="${oldEmail}"/>
	                        	<form:errors path="email" cssClass="error" element="p"/>
	                        	<c:if test="${errorForm == 'email'}">
	                        		<p class="error"><spring:message code="signUp.emailTaken"/></p>
	                        	</c:if>
                        	</div>  
							<div class="editdata-list-item">
	                        	<form:label path="phoneNumber"><spring:message code="profile.phoneNumber"/></form:label>
	                        	<spring:message code="profile.placeholderPhoneNumber" var="phoneNumber"/>
	                        	<form:input class="editdata-input" path="phoneNumber" type="text" placeholder="${phoneNumber}" name="phoneNumber" value="${phone}"/>
	                        	<form:errors path="phoneNumber" cssClass="error" element="p"/>
                        	</div>
	                        <div>
	                        	<spring:message code="profile.submit" var="sumbit"/>
	                        	<input class="editdata-submit" type="submit" value="${sumbit}">
							</div>
						</div>
           			</form:form>
           		</div>
           
           		<div class="data polaroid last">
	           		<div class="title-container">       
		          		<h3><spring:message code="profile.titleNewPassword"/></h3>  
					</div>
					<c:url value="/profilePassword" var="postPathpass"/>
					<form:form modelAttribute="PasswordForm" action="${postPathpass}" method="post">
						<div class="form">
							<div class="editdata-list-item">
	                        	<form:label path="passwordOld"><spring:message code="profile.password"/></form:label>
	                        	<spring:message code="profile.placeholderPassword" var="password"/>
	                        	<form:input class="editdata-input" path="passwordOld" type="password" placeholder="${password}" name="password"/>
	                        	<form:errors path="passwordOld" cssClass="error" element="p"/>
	                        	<c:if test="${errorForm == 'password'}">
	                        		<p class="error"><spring:message code="profile.passwordError"/></p>
	                        	</c:if>
	                        </div>
							<div class="editdata-list-item">
	                        	<form:label path="passwordNew"><spring:message code="profile.newpassword"/></form:label>
	                        	<spring:message code="profile.placeholderNewPassword" var="password"/>
	                        	<form:input class="editdata-input" path="passwordNew" type="password" placeholder="${password}" name="password"/>
	                        	<form:errors path="passwordNew" cssClass="error" element="p"/>
	                        </div>
	                        <div>
	                        	<spring:message code="profile.submit" var="sumbit"/>
	                        	<input class="editdata-submit" type="submit" value="${sumbit}">
							</div>
	                 	</div>  
	           		</form:form>
           		</div>
			</div>
		</section>
		
		
		<section>
			<div id="Publications">
				<h2 class="title_section"><spring:message code="profile.publications" />: <c:out value="${publicationsLenght}"/></h2> 
				<div class="section_publications">
		        	<div class="favourites" id="list-of-publications">	        		
		        		<c:set var = "listLength" scope = "session" value = "${publicationsLenght}"/>
			        	<c:set var = "maxLength" scope = "session" value = "3"/>
			        	<c:set var = "page" scope = "session" value = "${pagePub}"/>
			        	<c:set var = "current" scope = "session" value = "1"/>
	        		
	        		<c:forEach var="row" varStatus="status" items="${publications}" step="1" begin="${0}">
	        			<c:if test = "${current <= maxLength}">
	        			<c:set var = "current" scope = "session" value = "${current+1}"/>
	        			<c:set var = "operation" scope = "session" value = "${row.operation}"/>
	        			
						<div class="polaroid-property">
				    		<div class="img-with-tag" id="imageDiv_${row.publicationid}" currentImage="0">
								<c:choose>
									<c:when test="${row.images[0].imageid >= 0}">
										<img class="polaroid-property-img" src="<c:url value="/imagesByUpload/${row.images[0].imageid}" />">
									</c:when>    
									<c:otherwise>
										<img class="polaroid-property-img" src="<c:url value="/resources/pics/default.jpg" />">
									</c:otherwise>
								</c:choose>		
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
								<div class="more-info" id="more-info-first">
									<c:url value="/profilePublicationEdit" var="editURL" />
									<form:form action="${editURL}">
										<input type="hidden" name="publicationid"/>
										<a class="more-info-title" href="<c:url value="#"/>" onclick="setEdit(this,'${row.publicationid}')"><img class="delete" src="<c:url value="/resources/pics/pencil.png" />
									
	                        "><spring:message code="profile.edit"/> </a>
	                        	</form:form>
								</div>		
								<div class="more-info">
									<a class="more-info-title pointer" href="<c:url value="#"/>" onclick="setDeleteid('${pagePub}', '${row.publicationid}')"><img class="delete" src="
	                        <c:url value="/resources/pics/trash.png" />
	                        "><spring:message code="profile.delete"/> </a>
								</div>		
							</div>
							</div>
						</div>	
					</c:if>
				</c:forEach>		
				</div>	
				
			<c:if test="${listLength == 0}">	        
	 	       <div id="no-results">
					<h2 id="no-results-title"><spring:message code="profile.noResultsTitle"/></h2>
					<div id="info-and-link">
						<h3 id="no-results-info"><spring:message code="profile.noResultsInfo"/></h3>
						<a id="no-results-link" href="<c:url value="./publish"/>"><spring:message code="profile.clickHere"/></a>
					</div>
				</div>
	        </c:if>
			

			</div>

			<c:set var = "page" value = "${pagePub}"/>
			
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
	       	
	        <!--
	        <c:if test="${listLength == 0}">	        
	 	       <div id="no-results">
					<h2 id="no-results-title"><spring:message code="list.noResultsTitle"/></h2>
					<h3 id="no-results-info"><spring:message code="list.noResultsInfo"/></h3>
				</div>
	        </c:if>
	        -->

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
				    
	       	<c:if test="${listLength != 0}">
	       	<!--
	       		<c:if test="${listLength <= maxLength}">
	 	      		<div class="page-nums-container">
						<div class="page-nums">
							<a class="page-number" href="<c:url value="profile?page=${PreviousPage}"/>">&laquo;</a>
							<c:set var="counter" value="1"/>
							<a class="page-number" id="${counter}" href="<c:url value="profile?page=${counter}"/>">${counter}</a>
							<c:set var="counter" value="${counter+1}"/>
 							<a class="page-number" href="<c:url value="profile?page=${nextPage}"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>	-->        
	       		<c:if test="${listLength > maxLength}">
		        	<div class="page-nums-container">
						<div class="page-nums">
								<a class="page-number" href="<c:url value="profile?pagePub=${PreviousPage}&pageFav=${pageFav}&option=myPublications"/>">&laquo;</a>
								<c:if test="${page > startPagination}">
									<a class="page-number" href="<c:url value="profile?pagePub=1&pageFav=${pageFav}&option=myPublications"/>">1</a>
									<a class="page-number" href="<c:url value="profile?pagePub=${page - 3}&pageFav=${pageFav}&option=myPublications"/>">...</a>
								</c:if>
							<c:set var="counter" value="${initial}"/>
							<c:forEach begin="${initial}" end="${end}" varStatus="loop">
								<a class="page-number" id="${counter}_publications" href="<c:url value="profile?pagePub=${counter}&pageFav=${pageFav}&option=myPublications"/>">${counter}</a>
								<c:set var="counter" value="${counter+1}"/>
							</c:forEach>
							<c:if test="${page < maxPage - 3}">
								<a class="page-number" href="<c:url value="profile?pagePub=${page + 3}&pageFav=${pageFav}&option=myPublications"/>">...</a>
								<a class="page-number" href="<c:url value="profile?pagePub=${maxPage}&pageFav=${pageFav}&option=myPublications"/>"><c:out value="${maxPage}" /></a>
							</c:if>
 							<a class="page-number" href="<c:url value="profile?pagePub=${nextPage}&pageFav=${pageFav}&option=myPublications"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>	        
			</c:if>	 				    
				        
	       	</div>       
		</section>
		
		
		<section>
		<div id="Favourites">
				<h2 class="title_section"><spring:message code="profile.favourites" /></h2>  
				<div class="section_publications">
		        	<div class="favourites" id="list-of-publications">	        		
		        		<c:set var = "listLength" scope = "session" value = "${favPublicationsLenght}"/>
			        	<c:set var = "maxLength" scope = "session" value = "3"/>
			        	<c:set var = "page" scope = "session" value = "${pageFav}"/>
			        	<c:set var = "current" scope = "session" value = "1"/>
	        		<c:forEach var="row" varStatus="status" items="${favPublications}" step="1" begin="${0}">
	        			<c:if test = "${current <= maxLength}">
	        			<c:set var = "current" scope = "session" value = "${current+1}"/>
	        			<c:set var = "operation" scope = "session" value = "${row.operation}"/>
						<div class="polaroid-property">
				    		<div class="img-with-tag" id="imageDiv_favourite${row.publicationid}" currentImage="0">
								<c:choose>
									<c:when test="${row.images[0].imageid >= 0}">
										<img class="polaroid-property-img" src="<c:url value="/imagesByUpload/${row.images[0].imageid}" />">
									</c:when>    
									<c:otherwise>
										<img class="polaroid-property-img" src="<c:url value="/resources/pics/default.jpg" />">
									</c:otherwise>
								</c:choose>		
								<c:url value="/unfavPublication" var="postFav"/>
								<form:form action="${postFav}" method="POST">
									<input type="hidden" name="publicationid"/>
					    			<img class="favorite-icon pointer" id="<c:out value='${row.publicationid}'/>" onclick="submitFavv(this);" src="<c:url value="/resources/pics/heart_filled.png"/>" alt="Fave">
					    		</form:form>
				    			<c:if test = "${fn:length(row.images) > 1}">
				    			<img class="next-image pointer" onclick="getNextImage('${row.publicationid}', 'polaroid-property-img', 'favourite')" src="<c:url value="/resources/pics/arrow_right.png" />" alt="Next">
				    			<img class="prev-image pointer" onclick="getPreviousImage('${row.publicationid}', 'polaroid-property-img', 'favourite')" src="<c:url value="/resources/pics/arrow_left.png" />" alt="Previous">
				    			</c:if>
								<h2 class="price-tag">U$S <c:out value = "${row.price}"/></h2>
							</div>
							<div style="display:none" id="imagesIDs_favourite${row.publicationid}">
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
								<div class="more-info-fav">
									 <c:set var="publicationidVar" value="${row.publicationid}"/>
									 <c:set var="detailsURL"><c:url value="./details?publicationid=${publicationidVar}"/></c:set>
									 <a class="more-info-title" href="<c:url value="${detailsURL}"/>">
									 <spring:message code="list.moreInfo"/> ></a>
								</div>			
								</div>			
							</div>
						</div>	
					</c:if>
				</c:forEach>		
				</div>	
				
			<c:if test="${listLength == 0}">	        
	 	       <div id="no-results">
					<h2 id="no-results-title"><spring:message code="profile.noResultsFavTitle"/></h2>
					<div id="info-and-link">
						<h3 id="no-results-info"><spring:message code="profile.noResultsFavInfo"/></h3>
						<a id="no-results-link" href="<c:url value="/"/>"><spring:message code="profile.clickHere"/></a>
					</div>
				</div>
	        </c:if>
			

			</div>
			
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
	       	
<!--	        <c:if test="${listLength == 0}">	        
	 	       <div id="no-results">
					<h2 id="no-results-title"><spring:message code="profile.noResultsTitle"/></h2>
					<div id="info-and-link">
						<h3 id="no-results-info"><spring:message code="profile.noResultsInfo"/></h3>
						<a id="no-results-link" href="<c:url value="/"/>"><spring:message code="profile.clickHere"/></a>
					</div>
				</div>
	        </c:if>
-->
	       	<c:set var = "startPagination" scope = "session" value = "${3}"/>
	       	<c:set var = "page" value = "${pageFav}" />
	       	
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
				    
	       	<c:if test="${listLength != 0}">   
	       		<c:if test="${listLength > maxLength}">
		        	<div class="page-nums-container">
						<div class="page-nums">
								<a class="page-number" href="<c:url value="profile?pageFav=${PreviousPage}&pagePub=${pagePub}&option=myFavourites"/>">&laquo;</a>
								<c:if test="${page > startPagination}">
									<a class="page-number" href="<c:url value="profile?pageFav=1&pagePub=${pagePub}&option=myFavourites"/>">1</a>
									<a class="page-number" href="<c:url value="profile?pageFav=${page - 3}&pagePub=${pagePub}&option=myFavourites"/>">...</a>
								</c:if>
							<c:set var="counter" value="${initial}"/>
							<c:forEach begin="${initial}" end="${end}" varStatus="loop">
								<a class="page-number" id="${counter}_favourites" href="<c:url value="profile?pageFav=${counter}&pagePub=${pagePub}&option=myFavourites"/>">${counter}</a>
								<c:set var="counter" value="${counter+1}"/>
							</c:forEach>
							<c:if test="${page < maxPage - 3}">
								<a class="page-number" href="<c:url value="profile?pageFav=${page + 3}&pagePub=${pagePub}&option=myFavourites"/>">...</a>
								<a class="page-number" href="<c:url value="profile?pageFav=${maxPage}&pagePub=${pagePub}&option=myFavourites"/>"><c:out value="${maxPage}" /></a>
							</c:if>
 							<a class="page-number" href="<c:url value="profile?pageFav=${nextPage}&pagePub=${pagePub}&option=myFavourites"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>	        
			</c:if>
			
			
			
		</div>
		</section>
		
        
        <footer>
        	<div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          	</div>
        </footer>
        
        <script src="<c:url value="/resources/js/details.js" />"></script>
    </body>
</html>
