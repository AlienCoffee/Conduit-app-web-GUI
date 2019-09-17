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
        <title>Registration</title>
        
        <!--<link rel="stylesheet" href="/resources/css/index.css" />-->
        <!--<link rel="shortcut icon" href="/resources/gfx/jiraf.png" type="image/x-icon">-->
    </head>
    
    <body>
    	<h2>Period registration</h2>
    	
    	<a href="/">index</a>
    	<a href="/periods">periods</a>
    	
    	<!--
    	<c:if test="${have_assigned_roles}">
    		<p>
    			<span><b>Registered templates:</b></span>
    			<c:forEach var="temp" items="${templates}">
    				<span>${temp.getName ()}</span>
    			</c:forEach>
    		</p>
    	</c:if>
    	-->
    	
    	<c:choose>
    		<c:when test="${period.getStatus () eq 'REGISTRATION' 
    						&& !have_assigned_roles}">
    			<p>
		    		<select id="regType"></select>
		    		<button id="loadTypes">load</button>
		    	</p>
		    	
		    	<div id="regDiv"></div>
		    	
		    	<input id="periodID" type="hidden" value="${period.getId ()}" />
		    	<input id="userID" type="hidden" value="${user.getId ()}" />
    		</c:when>
    		
    		<c:otherwise>
    			<p>Registration is closed for this period</p>
    		</c:otherwise>
    	</c:choose>
    	<script src="/resources/js/period.js"></script>
    </body>
</html>