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
        <script src="<c:url value="/resources/js/editPublication.js" />"></script>
        <script src="<c:url value="/resources/js/location.js" />"></script>
        <script src="<c:url value="/resources/js/navbar.js" />"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>

    <c:set var = "provinceId" scope = "session"><c:out value="${province.provinceid}"/></c:set>
    <c:set var = "cityId" scope = "session"><c:out value="${city.cityid}"/></c:set>
    <c:set var = "neighborhoodId" scope = "session"><c:out value="${neighborhood.neighborhoodid}"/></c:set>
    <c:set var = "provinceName" scope = "session"><c:out value="${province.province}"/></c:set>
    <c:set var = "cityName" scope = "session"><c:out value="${city.city}"/></c:set>
    <c:set var = "neighborhoodName" scope = "session"><c:out value="${neighborhood.neighborhood}"/></c:set>

        <body onload="chargeParameters('${operation}','${propertyType}','${provinceId}','${cityId}','${neighborhoodId}','${provinceName}','${cityName}','${neighborhoodName}')">
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
        
        <section>
            <div id="Edit">
                <div class="data polaroid" id="editdata">
                    <div class="title-container">       
                        <h3><spring:message code="profile.editTitle"/></h3>  
                    </div>
                	<c:url value="/profilePublicationEditPost" var="postPath"/>
                    <form:form modelAttribute="ThirdPublicationForm" action="${postPath}" method="POST">
                        <div class="form">
                            <div class="editdata-list-item">
                           	    <c:set var = "titleVar" scope = "session"><c:out value="${title}"/></c:set>            
                                <form:label path="title"><spring:message code="profile.title"/></form:label>
                                <form:input path="title" class="editdata-input" type="text" value="${titleVar}"/>
                                <form:errors path="title" cssClass="error" element="p"/>
                            </div>
                    <div class="editdata-list-item">
                    <form:label path="province"><spring:message code="publish.province"/></form:label>
                    <c:set var = "actualProvince" scope = "session"><c:out value = "${province.provinceid}"/>
                    </c:set>
                    <select id="selectProvince" onchange="showCities(this);setProvince(this)" value="${actualProvince}"> <c:out value = "${province.province}"/>
                        <option value="-1"><spring:message code="publish.selectProvince"/></option>
                        <c:forEach var="row" varStatus="status" items="${provinces}" step="1" begin="0">
                            <c:set var = "currentProvince" scope = "session"><c:out value = "${row.provinceid}"/></c:set>
                            <option value="${currentProvince}"><c:out value = "${row.province}"/></option>
                        </c:forEach>
                    </select>
                   <form:errors path="province" cssClass="error" element="p"/>
                   </div>
                     <div class="editdata-list-item">
                        <form:label path="city"><spring:message code="publish.city"/></form:label>
                        <select name="selectCity" id="defaultSelectCity">
                            <option value="-1"><spring:message code="publish.selectCity"/></option>
                        </select>
                        <c:forEach var="row" varStatus="status" items="${provinces}" step="1" begin="0">
                            <c:set var = "provinceid" scope = "session"><c:out value = "${row.provinceid}"/></c:set>
                            <select id="province_${provinceid}" name="selectCity" onchange="setCity(this);showNeighborhoods(this)">
                                <option value=""><spring:message code="publish.selectCity"/></option>
                            <c:forEach var="city" varStatus="status" items="${row.cities}" step="1" begin="0">
                                <c:set var = "currentCity" scope = "session"><c:out value = "${city.cityid}"/></c:set>
                                <option value="${currentCity}"><c:out value = "${city.city}"/></option>
                            </c:forEach>
                            </select>
                        </c:forEach>
                        <form:errors path="city" cssClass="error" element="p"/>
                     </div>
                     <div class="editdata-list-item">
                     <form:label path="neighborhood"><spring:message code="publish.neighborhood"/></form:label>
                        <select name="selectNeighborhood" id="defaultSelectNeighborhood">
                            <option value="-1"><spring:message code="publish.selectNeighborhood"/></option>
                        </select>
                            <c:forEach var="city" varStatus="status" items="${cities}" step="1" begin="0">
                                <c:set var = "cityID" scope = "session"><c:out value = "${city.cityid}"/></c:set>
                                <select name="selectNeighborhood" id="city_${cityID}" onchange="setNeighborhood(this)">
                                    <option value=""><spring:message code="publish.selectNeighborhood"/></option>
                                <c:forEach var="neighborhood" varStatus="status" items="${city.neighborhoods}" step="1" begin="0">
                                    <c:set var = "neighborhoodID" scope = "session"><c:out value = "${neighborhood.neighborhoodid}"/></c:set>
                                    <option value="${neighborhoodID}"><c:out value = "${neighborhood.neighborhood}"/></option>
                                </c:forEach>
                                </select>
                            </c:forEach>
                        <form:errors path="neighborhood" cssClass="error" element="p"/>
                            <form:input type="hidden" path="province" id="provinceOfCity"/>
                            <form:input type="hidden" path="city" id="cityOfNeighborhood"/>
                            <form:input type="hidden" path="neighborhood" id="neighborhood"/>
                            </div>
                            <div class="editdata-list-item">
                            	<c:set var = "addressVar" scope = "session"><c:out value="${address}"/></c:set>
                                <form:label path="address"><spring:message code="profile.address"/></form:label>
                                <form:input path="address" class="editdata-input" type="text" value="${addressVar}"/>
                                <form:errors path="address" cssClass="error" element="p"/>
                            </div>
                            <div class="editdata-list-item">
                                <label><spring:message code="profile.operationType"/></label>
                                 <div class="op-type-box">
                                            <input class="radio-1" id="FSale" name="operation" type="radio" name="op-type" value="FSale"><spring:message code="publish.forSale"/><br>
                                            <input class="radio-2" id="FRent" name="operation" type="radio" name="op-type" value="FRent"><spring:message code="publish.forRent"/><br>
                                 </div> 
                            </div>  
                            <div class="editdata-list-item">
                            	<c:set var = "priceVar" scope = "session"><c:out value="${price}"/></c:set>
                                <form:label path="price"><spring:message code="profile.price"/></form:label>
                                <form:input class="editdata-input" path="price" type="text" value="${priceVar}"/>
                                <form:errors path="price" cssClass="error" element="p"/>
                            </div>
                            <div class="editdata-list-item">
                            	<c:set var = "descriptionVar" scope = "session"><c:out value="${description}"/></c:set>
                                <form:label path="description"><spring:message code="profile.description"/></form:label>
                                <form:input path="description" class="editdata-input" type="text" value="${descriptionVar}"/>
                                <form:errors path="description" cssClass="error" element="p"/>
                            </div>
                            <div class="editdata-list-item">
                                <label><spring:message code="profile.propertyType"/></label>
                                <div class="op-type-box">
                                        <input class="radio-1" id="Apartment" type="radio" name="propertyType" value="Apartment"><spring:message code="publish2.apartment"/><br>
                                        <input class="radio-2" id="House" type="radio" name="propertyType" value="House"><spring:message code="publish2.house"/><br>
                                 </div>     
                            </div>
                            <div class="editdata-list-item">
                            	<c:set var = "bedroomsVar" scope = "session"><c:out value="${bedrooms}"/></c:set>
                                <form:label path="bedrooms"><spring:message code="profile.numberBedrooms"/></form:label>
                                <form:input path="bedrooms" class="editdata-input" type="text" value="${bedroomsVar}"/>
                                <form:errors path="bedrooms" cssClass="error" element="p"/>
                            </div>
                            <div class="editdata-list-item">
                            	<c:set var = "bathroomsVar" scope = "session"><c:out value="${bathrooms}"/></c:set>
                                <form:label path="bathrooms"><spring:message code="profile.numberBathrooms"/></form:label>
                                <form:input path="bathrooms" class="editdata-input" type="text" value="${bathroomsVar}"/>
                                <form:errors path="bathrooms" cssClass="error" element="p"/>
                            </div>
                            <div class="editdata-list-item">
                            	<c:set var = "floorSizeVar" scope = "session"><c:out value="${floorSize}"/></c:set>
                                <form:label path="floorSize"><spring:message code="profile.propertySize"/></form:label>
                                <form:input path="floorSize" class="editdata-input" type="text" value="${floorSizeVar}"/>
                                <form:errors path="floorSize" cssClass="error" element="p"/>
                            </div>
                            <div class="editdata-list-item">
                            	<c:set var = "parkingVar" scope = "session"><c:out value="${parking}"/></c:set>
                                <form:label path="parking"><spring:message code="profile.parkingSpots"/></form:label>
                                <form:input path="parking" class="editdata-input" type="text" value="${parkingVar}"/>
                                <form:errors path="parking" cssClass="error" element="p"/>
                            </div>                          
                            <div>
                                <spring:message code="profile.submit" var="sumbit"/>
                                <input type="hidden" name="publicationid" value="<c:out value='${publicationid}'/>"/>
                                <input class="editdata-submit" type="submit" value="${sumbit}"/>
                            </div>
                        </div>
                  	 </form:form>
            	</div>
            </div>
        </section>
        
        
        <footer>
            <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
            </div>
        </footer>
        
        <script src="<c:url value="/resources/js/details.js" />"></script>
    </body>