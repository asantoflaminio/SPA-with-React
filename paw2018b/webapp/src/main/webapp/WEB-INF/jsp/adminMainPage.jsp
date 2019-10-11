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
        <link rel="shortcut icon" href="
        <c:url value="/resources/pics/favicon.ico" />
        ">
        <link rel="stylesheet" type="text/css" href="
        <c:url value="/resources/css/adminMainPage.css" />
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
        <script src="<c:url value="/resources/js/adminMainPage.js" />"></script>
        <script src="<c:url value="/resources/js/location.js" />"></script>
        <script src="<c:url value="/resources/js/imageManager.js" />"></script>
        <script src="<c:url value="/resources/js/navbar.js" />"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>

        <body onload="startUp('${option}', '${pageUsers}', '${pagePub}')">
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
           					<a class="user_dropdown" href="<c:url value="./adminMainPage"/>"><spring:message code="nav.principal"/></a>
           				</sec:authorize>
          				<a class="user_dropdown" href="<c:url value="./profile"/>"><spring:message code="nav.myProfile"/></a>
           			    <a class="user_dropdown" href="<c:url value="./logout"/>"><spring:message code="nav.logOut"/></a>
           			</div>
           		</div>
            </div>
            <div>
                <a class="navbar_item" id="publish" href="<c:url value="../publish"/>"><spring:message code="nav.publish"/></a>
            </div>
            </c:if>
        </nav>
        
        <aside>
      		<div class="leftcol">
	       		<ul>
	       		  <li id="loc" class="current" onclick="showLocationSection()"><a href="<c:url value="#"/>" ><spring:message code="admin.manageLocations"/></a></li>
		          <li id="usr" onclick="showUsersSection()"><a href="<c:url value="#"/>"><spring:message code="admin.manageUsers"/></a></li>
		          <li id="pub" onclick="showPublicationsSection()"><a href="<c:url value="#"/>"><spring:message code="admin.managePublications"/></a></li>
	        	</ul>
      		</div>
		</aside>
		
        <div class="polaroid data hidden" id="location">
            <div class="title-container">       
            	<h3><spring:message code="admin.addLocations"/></h3>  
            </div>
        	<div class="signup-list-item">
        		<c:url value="/admin/postProvince" var="postProvince"/>
        		<form:form action="${postProvince}" method="POST">
	                <spring:message code="admin.send" var="send"/>
	        		<label><spring:message code="publish.province"/></label>
	        		<input class="location-input" type="text" name="province" oninput="checkAdminInput(this)"/>
	        		<input type="submit" value="${send}" class="signup-submit">
	        	</form:form>
        	</div>
        	<div class="signup-list-item">
        		<c:url value="/admin/postCity" var="postCity"/>
        		<form:form action="${postCity}" method="POST">
	        		<label><spring:message code="publish.province"/></label>
	        		<select class="location-select" onchange="setProvince(this)">
	        			<option value=""></option>
	        			<c:forEach var="row" varStatus="status" items="${provinces}" step="1" begin="${init}">
	        				<c:set var = "currentProvince" scope = "session"><c:out value="${row.provinceid}"/></c:set>
	        				<option value="${currentProvince}"><c:out value = "${row.province}"/></option>
	        			</c:forEach>
	        		</select>
	                <spring:message code="admin.send" var="send"/>
	        	    <label><spring:message code="publish.city"/></label>
	        	    <input type="hidden" name="province" id="provinceOfCity" />
	        		<input type="text" class="location-input" name="city" oninput="checkAdminInput(this)"/>
	        		<input type="submit" value="${send}" class="signup-submit">
	        	</form:form>
	        </div>
        	<div class="signup-list-item">
        		<c:url value="/admin/postNeighborhood" var="postNeighborhood"/>
        		<form:form action="${postNeighborhood}" method="POST">
	        		<label><spring:message code="publish.province"/></label>
                    <select class="location-select" onchange="showCitiesAdmin(this)">
                        <option value=""></option>
                        <c:forEach var="row" varStatus="status" items="${provinces}" step="1" begin="${init}">
                            <c:set var = "currentProvince" scope = "session"><c:out value = "${row.provinceid}"/></c:set>
                            <option value="${currentProvince}"><c:out value = "${row.province}"/></option>
                        </c:forEach>
                    </select>
	        		<label><spring:message code="publish.city"/></label>
                        <select name="selectCity" class="location-select" id="defaultSelectCity">
                             <option value="" hidden></option>
                        </select>
                        <c:forEach var="row" varStatus="status" items="${provinces}" step="1" begin="${init}">
                            <c:set var = "provinceid" scope = "session"><c:out value = "${row.provinceid}"/></c:set>
                            <select id="${provinceid}" class="location-select" name="selectCity" onchange="setCity(this)">
                                <option value="" hidden></option>
                            <c:forEach var="city" varStatus="status" items="${row.cities}" step="1" begin="${init}">
                                <c:set var = "currentCity" scope = "session"><c:out value = "${city.cityid}"/></c:set>
                                <option value="${currentCity}"><c:out value = "${city.city}"/></option>
                            </c:forEach>
                            </select>
                        </c:forEach>
	                <spring:message code="admin.send" var="send"/>
	        	    <label><spring:message code="publish.neighborhood"/></label>
	        	    <input type="hidden" name="city" id="cityOfNeighborhood"/>
	        		<input type="text" class="location-input" name="neighborhood" oninput="checkAdminInput(this)"/>
	        		<input type="submit" value="${send}" class="signup-submit">
	        	</form:form>
        	</div>
        	<div>
        	</div>
        </div>

        <c:set var = "listLength" scope = "session" value = "${usersLength}"/>
        <c:set var = "maxLength" scope = "session" value = "6"/>
        <c:set var = "currentUser" scope = "session" value = "1"/>
        <div class="polaroid data hidden" id="users">
				<div class="title-container">
					<h3><spring:message code="admin.activeUsers"/></h3>
				</div>
			   	<c:forEach var="user" varStatus="status" items="${users}" step="1" begin="0">
	        	<c:if test="${currentUser <= maxLength}">
	        		<c:set var = "currentUser" scope = "session" value = "${currentUser + 1}"/>
	        		<div class="user-list">
	        			<div class="user-list-left">
	        				<p class="user-email"><c:out value = "${user.email}"/></p>
	        			</div>
	        			<div class="user-list-right">
							<label class="switch">
								<c:if test="${user.locked == true}">
  									<input type="checkbox" checked onclick="submitBlockUser('${user.userid}', '${user.locked}', '${pageUsers}')">
  								</c:if>
  								<c:if test="${user.locked == false}">
  									<input type="checkbox" onclick="submitBlockUser('${user.userid}', '${user.locked}', '${pageUsers}')">
  								</c:if>
  								<span class="slider round"></span>
							</label>	
							<c:if test="${user.locked == false}">        				
	        					<p class="user-status"><spring:message code="admin.userStatusUnblocked"/></p>
	        				</c:if>
	        				<c:if test="${user.locked == true}">        				
	        					<p class="user-status"><spring:message code="admin.userStatusblocked"/></p>
	        				</c:if>
	        			</div>
	        		</div>
	        	</c:if>
        	</c:forEach>

        	<c:url value="/admin/blockUser" var="blockUser"/>
        	<form:form action="${blockUser}" method="post" id="blockUserForm">
        		<input type="hidden" id="useridBlock" name="userid" />
        		<input type="hidden" id="userstatusBlock" name="statusUser"/>
        		<input type="hidden" id="pageUsersBlock" name="pageUsers"/>
        	</form:form>
        

        	<c:set var = "page" value = "${pageUsers}"/>
			
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

			<c:if test="${listLength != 0}">
	       		<c:if test="${listLength > maxLength}">
		        	<div class="page-nums-container">
						<div class="page-nums">
								<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${previousPage}&pagePub=${pagePub}&option=users"/>">&laquo;</a>
								<c:if test="${page > startPagination}">
									<a class="page-number" href="<c:url value="adminMainPage?pageUsers=1&pagePub=${pagePub}&option=users"/>">1</a>
									<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${page - 3}&pagePub=${pagePub}&option=users"/>">...</a>
								</c:if>
							<c:set var="counter" value="${initial}"/>
							<c:forEach begin="${initial}" end="${end}" varStatus="loop">
								<a class="page-number" id="${counter}_users" href="<c:url value="adminMainPage?pageUsers=${counter}&pagePub=${pagePub}&option=users"/>">${counter}</a>
								<c:set var="counter" value="${counter+1}"/>
							</c:forEach>
							<c:if test="${page < maxPage - 3}">
								<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${page + 3}&pagePub=${pagePub}&option=users"/>">...</a>
								<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${maxPage}&pagePub=${pagePub}&option=users"/>"><c:out value="${maxPage}" /></a>
							</c:if>
 							<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${nextPage}&pagePub=${pagePub}&option=users"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>	        
			</c:if>
		</div>


        <div class="section_publications hidden" id="publications">
        		<h2 class="title_section"><spring:message code="admin.publications" />: <c:out value="${publicationsLength}"/></h2> 
        
        		<c:set var = "listLength" scope = "session" value = "${publicationsLength}"/>
	        	<c:set var = "maxLength" scope = "session" value = "3"/>
	        	<c:set var = "page" scope = "session" value = "${pagePub}"/>
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
								<div class="more-info-pub">
									<label class="switch">
									<c:if test="${row.locked == true}">
  										<input type="checkbox" checked onclick="submitBlockPublication('${row.publicationid}', '${row.locked}', '${pagePub}')">
  									</c:if>
  									<c:if test="${row.locked == false}">
  										<input type="checkbox" onclick="submitBlockPublication('${row.publicationid}', '${row.locked}', '${pagePub}')">
  									</c:if>
									  <span class="slider round"></span>
									</label>
	        					<c:if test="${row.locked == false}">        				
	        						<p class="user-status"><spring:message code="admin.userStatusUnblocked"/></p>
	        					</c:if>
	        					<c:if test="${row.locked == true}">        				
	        						<p class="user-status"><spring:message code="admin.userStatusblocked"/></p>
	        					</c:if>
								</div>
								<div class="more-info-admin">
									<a class="more-info-title-admin" href="<c:url value="/details?publicationid=${fn:escapeXml(row.publicationid)}"/>"><spring:message code="list.moreInfo"/> ></a>
								</div>	
								</div>
							</div>
						</div>
					</c:if>
				</c:forEach>

			<c:url value="/admin/blockPublication" var="blockPublication"/>
        	<form:form action="${blockPublication}" method="post" id="blockPublicationForm">
        		<input type="hidden" id="publicationidBlock" name="publicationid" />
        		<input type="hidden" id="publicationstatusBlock" name="statusPub"/>
        		<input type="hidden" id="pagePublicationBlock" name="pagePub"/>
        	</form:form>

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

			<c:if test="${listLength != 0}">
	       		<c:if test="${listLength > maxLength}">
		        	<div class="page-nums-container">
						<div class="page-nums">
								<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=${previousPage}&option=publications"/>">&laquo;</a>
								<c:if test="${page > startPagination}">
									<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=1&option=publications"/>">1</a>
									<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=${page - 3}&option=publications"/>">...</a>
								</c:if>
							<c:set var="counter" value="${initial}"/>
							<c:forEach begin="${initial}" end="${end}" varStatus="loop">
								<a class="page-number" id="${counter}_publications" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=${counter}&option=publications"/>">${counter}</a>
								<c:set var="counter" value="${counter+1}"/>
							</c:forEach>
							<c:if test="${page < maxPage - 3}">
								<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=${page + 3}&option=publications"/>">...</a>
								<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=${maxPage}&option=publications"/>"><c:out value="${maxPage}" /></a>
							</c:if>
 							<a class="page-number" href="<c:url value="adminMainPage?pageUsers=${pageUsers}&pagePub=${nextPage}&option=publications"/>">&raquo;</a>
						</div>	        
					</div>
				</c:if>	        
			</c:if>
		</div>
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
	        	        
    </body>