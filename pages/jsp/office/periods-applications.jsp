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
        <title>Conduit :: Admin :: Applications</title>
        
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

                <div class="col-10">
                    <jsp:include page="periods-top-side-bar.jsp" />

                    <div class="d-flex align-items-start mb-5">
                        <div class="col-7 bg-white border border-top-0">
                            <div class="container d-flex justify-content-start align-items-center mt-4">
                                <h4>Applications</h4>
            
                                <div class="spinner-grow text-primary ml-2" 
                                    id="periods-table-spinner">
                                </div>
                            </div>

                            <div class="d-flex justify-content-end">
                                <!--
                                <div class="btn-group mr-2">
                                    <button type="button" class="btn btn-sm btn-secondary">
                                        <i class="fas fa-plus mr-1" aria-hidden="true"></i>
                                        [some text]
                                    </button>
                                </div>
                                -->
                            </div>

                            <div class="d-flex align-items-start mt-2"
                                id="applications-table">
                            </div>
                        </div>
        
                        <div class="col-5">
                            <div class="container d-flex justify-content-start align-items-center mt-4">
                                <h4>Application console</h4>
            
                                <div class="spinner-grow text-primary ml-2" 
                                    id="3289423">
                                </div>
                            </div>

                            <div class="ml-3 mt-3">
                                ...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer>

        </footer>

		<jsp:include page="../bootstrap.jsp" />
		
		<script type="text/javascript" src="/resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="/resources/js/ui.js"></script>
		<script>loadContext ("../", ["office/periods-applications"]);</script>
    </body>
</html>