<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Admin Sign In</title>
        <link rel="shortcut icon" href="<c:url value="/resources/pics/favicon.ico" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/signUp.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/navbar.css" />">
        <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/footer.css" />">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    </head>

    <body>
        <nav>
        	<a href="<c:url value="/"/>">
           		<img src="<c:url value="/resources/pics/Logo4.png" />" alt="Home" id="logo">
            </a>
        </nav>
        
		<div class="polaroid-member" id="adminSignIn">
			<div class="signup-container">
				<div id="signup-title">
					<h3><spring:message code="signUp.signInTitleAdmin"/></h3>
				</div>
					<div class="signup-list">
						<c:url value="/admin/adminSignIn" var="signUpLogInUrl" />
						<form:form action="${signUpLogInUrl}" method="POST" enctype="application/x-www-form-urlencoded">
						<div class="signup-list-item">
                        	<label><spring:message code="signUp.email"/></label>
                        	<input class="sign-up-input" type="text" placeholder="${email}" name="j_username"/>
                        </div>
                        <div class="signup-list-item signup-list-item-last">
                        	<label><spring:message code="signUp.password"/></label>
                        	<input class="sign-up-input" type="password" placeholder="${password}" name="j_password"/>
                        </div>
                        <c:set var = "logIn" scope = "session" value = "${error}"/>
                        <c:if test="${logIn == 'true'}">
                        	<p class="error signin-error"><spring:message code="signUp.signInError"/></p>
                        </c:if>
	                    <spring:message code="signUp.submitSignIn" var="signInValue"/>
	                    <input class="signup-submit" type="submit" value="${signInValue}">  
	                    </form:form>
					</div>
			</div>
		</div>
		
         <footer>
          <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          </div>
        </footer>

    </body>