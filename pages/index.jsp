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
        
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="resources/css/common.css"/>

        <!--<link rel="shortcut icon" href="/resources/gfx/jiraf.png" type="image/x-icon">-->
    </head>
    
    <body>
    	<jsp:include page="header.jsp" />
        
        <main class="container">
            <div class="row">
            	<jsp:include page="left-side-bar.jsp" />
            	
            	<div class="col-9">
                    <div class="d-flex justify-content-start align-items-center mt-4 ml-1">
                        <h2>Recent news</h2>
    
                        <div class="spinner-grow text-primary ml-2"></div>
                    </div>
                    <div class="text-left p-2">
                        <span>Hm. Seems to be nothing here. Maybe here will appear something soon...</span>
                    </div>
                    <div class="row p-3">
                        <div class="d-flex">
                            <div class="col mr-3">
                                <div class="row">
                                    <div style="height: 32px; width: 32px; background: gray;"
                                        data-toggle="tooltip" data-placement="bottom" 
                                        title="Shemplo">
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between">
                                    <h5>News post #2</h5>
                                    <div>
                                        <span class="px-3 text-muted">
                                            <sub>28.06.2019 15:32</sub>
                                        </span>
                                        <span class="pl-3 text-success">
                                            5 likes
                                        </span>
                                        <button class="btn btn-link">
                                            <span class="fas fa-heart text-danger"></span>
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <a class="pr-2" href="#">#post</a>
                                    <a class="pr-2" href="#">#notification</a>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat bibendum nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio convallis augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor. Nam sagittis nisl vitae arcu luctus, eget maximus lorem vulputate. Quisque vulputate metus quis neque placerat imperdiet. Fusce a porta turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac congue nisl, id gravida sapien. Fusce posuere faucibus felis eget consectetur. Duis euismod ipsum at neque porta ultricies. Maecenas dictum orci auctor dignissim lacinia. Vivamus elementum sagittis tellus, eget malesuada sapien pharetra ac.
                                </p>
                                <p>
                                    Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed. Duis auctor risus sit amet erat dapibus, eget gravida nunc ultrices. Mauris congue augue tortor, semper tempus justo accumsan in. Maecenas in interdum velit. Proin lacinia elit nulla, euismod sagittis massa gravida et. Aenean commodo auctor hendrerit. Proin pulvinar arcu id ornare congue. Mauris ullamcorper eros ac efficitur luctus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="d-flex">
                            <div class="col mr-3">
                                <div class="row">
                                    <div style="height: 32px; width: 32px; background: gray;"
                                        data-toggle="tooltip" data-placement="bottom" 
                                        title="Shemplo">
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between">
                                    <h5>News post #1</h5>
                                    <div>
                                        <span class="px-3 text-muted">
                                            <sub>24.06.2019 09:05</sub>
                                        </span>
                                        <span class="px-3 text-success">
                                            78 likes
                                        </span>
                                        <button class="btn btn-link">
                                            <span class="fas fa-heart text-body"></span>
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <a class="pr-2" href="#">#post</a>
                                    <a class="pr-2" href="#">#notification</a>
                                    <a class="pr-2" href="#">#first one</a>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat bibendum nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio convallis augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor. Nam sagittis nisl vitae arcu luctus, eget maximus lorem vulputate. Quisque vulputate metus quis neque placerat imperdiet. Fusce a porta turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac congue nisl, id gravida sapien. Fusce posuere faucibus felis eget consectetur. Duis euismod ipsum at neque porta ultricies. Maecenas dictum orci auctor dignissim lacinia. Vivamus elementum sagittis tellus, eget malesuada sapien pharetra ac.
                                </p>
                                <p>
                                    Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed. Duis auctor risus sit amet erat dapibus, eget gravida nunc ultrices. Mauris congue augue tortor, semper tempus justo accumsan in. Maecenas in interdum velit. Proin lacinia elit nulla, euismod sagittis massa gravida et. Aenean commodo auctor hendrerit. Proin pulvinar arcu id ornare congue. Mauris ullamcorper eros ac efficitur luctus.
                                </p>
                            </div>
                        </div>
                    </div>

                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <button class="btn btn-outline-primary">
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
		
		<script type="text/javascript" src="resources/js/require.2.3.6.js"></script>
        <script type="text/javascript" src="resources/js/ui.js"></script>
		<script>loadContext (["index"]);</script>
    </body>
</html>