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
        
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/errorPage.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/navbar.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/footer.css" />">
        <link rel="shortcut icon" href="<c:url value="/resources/pics/favicon.ico" />">
        <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="<c:url value="/resources/js/navbar.js" />"></script>
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
        
        		<div id="error-container">
 			<h1 id="error-title"><spring:message code="errorPage.title"/></h1>
 			
 			<p id="error-status"><spring:message code="errorPage.messageStatus"/> <spring:message code="errorPage.forbidden"/></p>

 			
  			<p id="error-message"><spring:message code="errorPage.message"/></p>
  		</div>
  		<div id="link1-container">
  			<a href="<c:url value="javascript:history.back()"/>" id="error-link1"><spring:message code="errorPage.goBack"/></a>
		</div>
  		<div id="link2-container">
  			<a href="<c:url value="/"/>" id="error-link2"><spring:message code="errorPage.backHome"/></a>
		</div>
        
		<footer>
          <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          </div>
        </footer>
	</body>
</html>
