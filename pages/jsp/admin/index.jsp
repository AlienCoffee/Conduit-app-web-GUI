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
        <title>Conduit :: Admin :: Administration panel</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/resources/css/common.css"/>

		<link rel="shortcut icon" href="/resources/gfx/diary.png" 
			type="image/x-icon" />
    </head>
    
    <body>
		<div class="px-4 popup-layer" id="popup"></div>
		
    	<jsp:include page="../header.jsp" />
        
        <main class="mx-5">
            <div class="row">
            	<jsp:include page="admin-left-side-bar.jsp" />
            </div>
        </main>

        <footer>

        </footer>

		<jsp:include page="../bootstrap.jsp" />
		
		<script type="text/javascript" src="/resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="/resources/js/ui.js"></script>
		<script>loadContext ("", ["admin/index"]);</script>
    </body>
</html>