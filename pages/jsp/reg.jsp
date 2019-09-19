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
        <title>Conduit :: Platform registration</title>
        
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
				<div class="col-3"></div>
				<div class="col-6 mt-2">
					<div class="d-flex justify-content-start align-items-center mt-2 ml-1">
						<h2>Registration in platform</h2>

						<div class="spinner-grow text-primary ml-2" 
							id="reg-spinner"></div>
					</div>

					<p class="ml-2">
						Just fill 3 fields and you are almost in platform
					</p>

					<form class="mt-4">
						<div class="form-group mb-3">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<span class="fas fa-at w-20px"></span>
									</span>
								</div>
								<input type="text" class="form-control user-reg-main-group" 
									placeholder="Login" id="reg-login">
							</div>
								
							<p class="small text-secondary ml-2 mt-1 mb-2">
								Login should be at least <b>3 characters</b> in length
								and contains only <code>a-z</code>, <code>0-9</code>, 
								<code>_</code>, <code>-</code> symbols
							</p>
						</div>
						<div class="form-group mb-3">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<span class="fas fa-phone w-20px"></span>
									</span>
								</div>
								<input type="tel" class="form-control user-reg-main-group"
									placeholder="Phone" id="reg-phone">
							</div>
								
							<p class="small text-secondary ml-2 mt-1 mb-2">
								Phone number will be used for SMS verification and other purposes
							</p>
						</div>
						<div class="form-group mb-3">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<span class="fas fa-key w-20px"></span>
									</span>
								</div>
								<input type="password" class="form-control user-reg-main-group" 
									placeholder="Password" id="reg-password">
								<div class="input-group-append">
									<button class="btn btn-outline-secondary" 
											id="reg-password-view">
										<span class="fas fa-eye w-20px"></span>
									</button>
								</div>
								<div class="input-group-append">
									<button class="btn btn-outline-secondary user-reg-main-group" 
											id="reg-password-random">
										<span class="fas fa-dice w-20px"></span>
									</button>
								</div>
							</div>
								
							<p class="small text-secondary ml-2 mt-1 mb-2">
								Password should be at least <b>8 characters</b> in length and can
								contain any symbols
							</p>
						</div>
						<div class="form-group mb-3 d-none" id="reg-secret-container">
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text">
										<span class="fas fa-question w-20px"></span>
									</span>
								</div>
								<input type="text" class="form-control"
									placeholder="Verification code" 
									id="reg-secret">

								<div class="input-group-append">
									<button class="btn btn-outline-secondary" 
											id="reg-secret-reject">
										<span class="fas fa-times w-20px"></span>
									</button>
								</div>
							</div>
								
							<p class="small text-secondary ml-2 mt-1 mb-2">
								Verification code from your phone 
								<b>(but now just repeat password)</b>
							</p>
						</div>

						<div class="d-flex justify-content-end align-items-center">
							<div class="mr-2">
								<small class="text-info">
									By clicking 
									<b>“<span id="reg-button-notice">Sign up</span>”</b>, 
									you agree to our Privacy Statement
								</small>
							</div>

							<button class="btn btn-primary ml-2"
									id="reg-button">
								Sign up
							</button>
						</div>
					</form>
				</div>
				<div class="col-3"></div>
            </div>
        </main>

        <footer>

        </footer>

		<jsp:include page="bootstrap.jsp" />
		
		<script type="text/javascript" src="resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="resources/js/ui.js"></script>
		<script>loadContext (["reg"]);</script>
    </body>
</html>