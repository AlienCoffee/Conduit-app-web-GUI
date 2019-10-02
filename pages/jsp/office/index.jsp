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
        <title>Conduit :: Admin :: Office panel</title>
        
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
                <jsp:include page="office-left-side-bar.jsp" />
                
                <div class="col-7">
                    <div class="d-flex justify-content-start align-items-center mt-4 ml-1">
                        <h2>Office index <small>+ help</small> page</h2>
                    </div>

                    <h6 class="mt-3">Hello, ${user.getLogin ()}.</h6>
                    <p>
                        You can see this page because somebody thinks that 
                        you are related to management of educational process.

                        For this there are several reasons: you are from
                        the <mark>org. committee</mark>, you are a 
                        <mark>teacher</mark> or you just a 
                        <mark>trusted person</mark>.

                        Anyway, everything what you can influence on is
                        placed in <b>Office parts</b> section of left menu bar
                        <span class="text-secondary">(here can be nothing)</span>.

                        Text bellow will just describe each of possible items of it:
                    </p>

                    <ul class="list-group list-group-flush border-bottom">
                        <li class="list-group-item">
                            <h5>
                                <i class="fas fa-stream mr-2" aria-hidden="true"></i>
                                Periods
                            </h5>
                            <div>Text</div>
                        </li>
                        <li class="list-group-item">
                            <h5>
                                <i class="fas fa-object-group mr-2" aria-hidden="true"></i>
                                Groups
                            </h5>
                            <div>Text</div>
                        </li>
                        <li class="list-group-item">
                            <h5>
                                <i class="fas fa-users mr-2" aria-hidden="true"></i>
                                Users
                            </h5>
                            <div>Text</div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>

        <footer>

        </footer>

		<jsp:include page="../bootstrap.jsp" />
		
		<script type="text/javascript" src="/resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="/resources/js/ui.js"></script>
		<script>loadContext ("", ["office/index"]);</script>
    </body>
</html>