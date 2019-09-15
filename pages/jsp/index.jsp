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
        <title>Conduit :: News page</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="resources/css/common.css"/>

		<link rel="shortcut icon" href="/resources/gfx/diary.png" 
			type="image/x-icon" />
    </head>
    
    <body>
		<div class="px-4 popup-layer" id="popup"></div>
		
    	<jsp:include page="header.jsp" />
        
        <main class="container">
            <div class="row">
            	<jsp:include page="left-side-bar.jsp" />
            	
            	<div class="col-9">
                    <div class="d-flex justify-content-start align-items-center mt-4 ml-1">
                        <h2>Recent news</h2>
    
						<div class="spinner-grow text-primary ml-2" 
							id="wall-spinner"></div>
					</div>
					
					<div class="text-left p-2" id="news-wall-nothing">
						<span>
							Hm. Seems to be nothing here. 
							Maybe here will appear something soon...
						</span>
					</div>

					<div id="news-wall"></div>
					
					<ul class="pagination justify-content-center mt-3 d-none"
							id="news-wall-more">
						<li class="page-item">
							<button class="btn btn-outline-info"
									id="news-wall-more-button">
								Load more...
							</button>
						</li>
					</ul>
                </div>
            </div>
        </main>

        <footer>

        </footer>

		<jsp:include page="bootstrap.jsp" />
		
		<script type="text/javascript" src="resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="resources/js/ui.js"></script>
		<script>loadContext (["index"]);</script>
    </body>
</html>