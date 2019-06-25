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
        <title>Conduit :: Study platform</title>
		
		<script type="text/javascript" src="resources/js/require.2.3.6.js"></script>
        <script type="text/javascript" src="resources/js/ui.js"></script>
        
        <link rel="stylesheet" href="resources/css/common.css"/>

        <!--<link rel="stylesheet" href="/resources/css/index.css" />-->
        <!--<link rel="shortcut icon" href="/resources/gfx/jiraf.png" type="image/x-icon">-->
    </head>
    
    <body>
        <header>
            <h1>Conduit</h1>
        </header>

        <main class="flex-top-around">
            <div class="side-container">
                * here will be menu *
            </div>
            <div class="content-container">
                <div class="content-block">
                    <div class="content-block-header">
                        <h2 class="content-block-header-title">news post</h2>
                        <p class="content-block-header-line">58.96.2014 25:36 - <u>Shemplo</u></p>
                    </div>
                    
                    <p class="content-block-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat bibendum nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio convallis augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor. Nam sagittis nisl vitae arcu luctus, eget maximus lorem vulputate. Quisque vulputate metus quis neque placerat imperdiet. Fusce a porta turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac congue nisl, id gravida sapien. Fusce posuere faucibus felis eget consectetur. Duis euismod ipsum at neque porta ultricies. Maecenas dictum orci auctor dignissim lacinia. Vivamus elementum sagittis tellus, eget malesuada sapien pharetra ac.
                    </p>

                    <p class="content-block-text">
                        Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed. Duis auctor risus sit amet erat dapibus, eget gravida nunc ultrices. Mauris congue augue tortor, semper tempus justo accumsan in. Maecenas in interdum velit. Proin lacinia elit nulla, euismod sagittis massa gravida et. Aenean commodo auctor hendrerit. Proin pulvinar arcu id ornare congue. Mauris ullamcorper eros ac efficitur luctus.
                    </p>
                    
                    <div class="content-block-footer">
                        <p class="content-block-header-line">
                            #a, #aa, #aaa
                        </p>
                    </div>
                </div>
                <div class="content-block">
                    <div class="content-block-header">
                        <h2 class="content-block-header-title">news post</h2>
                        <p class="content-block-header-line">58.96.2014 25:36 - <u>Shemplo</u></p>
                    </div>
                    
                    <p class="content-block-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat bibendum nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio convallis augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor. Nam sagittis nisl vitae arcu luctus, eget maximus lorem vulputate. Quisque vulputate metus quis neque placerat imperdiet. Fusce a porta turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac congue nisl, id gravida sapien. Fusce posuere faucibus felis eget consectetur. Duis euismod ipsum at neque porta ultricies. Maecenas dictum orci auctor dignissim lacinia. Vivamus elementum sagittis tellus, eget malesuada sapien pharetra ac.
                    </p>

                    <p class="content-block-text">
                        Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed. Duis auctor risus sit amet erat dapibus, eget gravida nunc ultrices. Mauris congue augue tortor, semper tempus justo accumsan in. Maecenas in interdum velit. Proin lacinia elit nulla, euismod sagittis massa gravida et. Aenean commodo auctor hendrerit. Proin pulvinar arcu id ornare congue. Mauris ullamcorper eros ac efficitur luctus.
                    </p>
                    
                    <div class="content-block-footer">
                        <p class="content-block-header-line">
                            #a, #aa, #aaa
                        </p>
                    </div>
                </div>
                <div class="content-block">
                    <div class="content-block-header">
                        <h2 class="content-block-header-title">news post</h2>
                        <p class="content-block-header-line">58.96.2014 25:36 - <u>Shemplo</u></p>
                    </div>
                    
                    <p class="content-block-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat bibendum nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio convallis augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor. Nam sagittis nisl vitae arcu luctus, eget maximus lorem vulputate. Quisque vulputate metus quis neque placerat imperdiet. Fusce a porta turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac congue nisl, id gravida sapien. Fusce posuere faucibus felis eget consectetur. Duis euismod ipsum at neque porta ultricies. Maecenas dictum orci auctor dignissim lacinia. Vivamus elementum sagittis tellus, eget malesuada sapien pharetra ac.
                    </p>

                    <p class="content-block-text">
                        Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed. Duis auctor risus sit amet erat dapibus, eget gravida nunc ultrices. Mauris congue augue tortor, semper tempus justo accumsan in. Maecenas in interdum velit. Proin lacinia elit nulla, euismod sagittis massa gravida et. Aenean commodo auctor hendrerit. Proin pulvinar arcu id ornare congue. Mauris ullamcorper eros ac efficitur luctus.
                    </p>
                    
                    <div class="content-block-footer">
                        <p class="content-block-header-line">
                            #a, #aa, #aaa
                        </p>
                    </div>
                </div>
            </div>
        </main>

        <footer>

        </footer>

		<script>loadContext (["index"]);</script>
    </body>
</html>