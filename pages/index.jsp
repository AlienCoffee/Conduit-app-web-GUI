<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE HTML>
<html>
    <head>
    	<meta name="_csrf"        content="${_csrf.token}"/>
		<meta name="_csrf_header" content="${_csrf.headerName}"/>
    
        <meta charset="UTF-8" />
        <title>Conduit</title>
		
		<script type="text/javascript" src="resources/js/require.2.3.6.js"></script>
		<script type="text/javascript" src="resources/js/ui.js"></script>

        <!--<link rel="stylesheet" href="/resources/css/index.css" />-->
        <!--<link rel="shortcut icon" href="/resources/gfx/jiraf.png" type="image/x-icon">-->
    </head>
    
    <body>
    	<h2>Index</h2>
    	<c:choose>
	    	<c:when test="${user != null}">
	    		<p>Hello: ${user.getLogin ()}</p>
				
	    		<button id="logout">logout</button>,
	    		<c:if test="${user.getIsAdmin ()}">
	    			<a href="/admin">admin</a>,
	    		</c:if>
	    		<a href="/periods">periods</a>
	    	</c:when>
	    	
	    	<c:otherwise>
	    		<a href="/login">login</a>
	    	</c:otherwise>
    	</c:choose>
		
		<!-- TODO: replace it with a TS module for this page -->
		<script src="/resources/js/index.js"></script>
		
		<script>loadContext (["index"]);</script>
    </body>
</html>