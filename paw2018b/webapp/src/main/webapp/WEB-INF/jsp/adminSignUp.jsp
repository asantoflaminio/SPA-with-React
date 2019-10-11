<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Admin Sign Up</title>
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

	    <div class="polaroid" id="adminSignUp">
			<div class="signup-container">
				<div id="signup-title">
					<h3><spring:message code="signUp.titleAdmin"/></h3>
				</div>
				<c:url value="/admin/adminSignUp/create" var="postPath"/>
				 <form:form modelAttribute="signUpForm" action="${postPath}" method="post">
					<div class="signup-list">
						<div class="signup-list-item">
                        	<form:label path="firstName"><spring:message code="signUp.firstName"/></form:label>
                        	<spring:message code="signUp.placeholderFirstName" var="firstName"/>
                        	<form:input class="sign-up-input" path="firstName" type="text" placeholder="${firstName}" name="firstName"/>
                        	<form:errors path="firstName" cssClass="error" element="p"/>
                        </div>
						<div class="signup-list-item">
                        	<form:label path="lastName"><spring:message code="signUp.lastName"/></form:label>
                        	<spring:message code="signUp.placeholderLastName" var="lastName"/>
                        	<form:input class="sign-up-input" path="lastName" type="text" placeholder="${lastName}" name="lastName"/>
                        	<form:errors path="lastName" cssClass="error" element="p"/>
                        </div>					
                        <div class="signup-list-item">
                        	<form:label path="email"><spring:message code="signUp.email"/></form:label>
                        	<spring:message code="signUp.placeholderEmail" var="email"/>
                        	<form:input class="sign-up-input" path="email" type="text" placeholder="${email}" name="email"/>
                        	<form:errors path="email" cssClass="error" element="p"/>
                        	<c:set var = "signUp" scope = "session" value = "${error}"/>	
                        	<c:if test="${signUp == 'emailTaken'}">
                        		<p class="error"><spring:message code="signUp.emailTaken"/></p>
                         	</c:if>
                        </div>
                        <div class="signup-list-item">
                        	<form:label path="password"><spring:message code="signUp.password"/></form:label>
                        	<spring:message code="signUp.placeholderPassword" var="password"/>
                        	<form:input class="sign-up-input" path="password" type="password" placeholder="${password}" name="password"/>
                        	<form:errors path="password" cssClass="error" element="p"/>

                        </div>
                        	<spring:message code="signUp.submitSignUp" var="signUpValue"/>
                        	<input class="signup-submit" type="submit" value="${signUpValue}">
					</div>
                </form:form>
			</div>
		</div>
		
         <footer>
          <div id="footer">
              <p>Copyright &copy; 2018, MeinHaus. All rights reserved.</p>
          </div>
        </footer>

    </body>