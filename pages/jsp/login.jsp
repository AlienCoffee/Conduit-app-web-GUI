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
        <title>Conduit :: Platform login</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="resources/css/common.css"/>

		<link rel="shortcut icon" href="/resources/gfx/diary.png" 
			type="image/x-icon" />
    </head>
    
    <body>
		<div class="px-4 popup-layer" id="popup"></div>
		
		<jsp:include page="header.jsp" />
		
		<!-- this is required for profile-component.ts -->
		<input type="hidden" value="false" id="user-profile-authorized" />
        
        <main class="container">
            <div class="row">
				<div class="col-3"></div>
				<div class="col-6 mt-2">
					<div class="d-flex justify-content-start align-items-center mt-2 ml-1">
						<h2>Login in platform</h2>

						<div class="spinner-grow text-primary ml-2" 
							id="user-profile-spinner"></div>
					</div>

					<p class="ml-2">
						Finally you just need to recall password
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
									placeholder="Login" id="user-profile-login-field">
							</div>
								
							<p class="small text-secondary ml-2 mt-1 mb-2">
								Login or phone number which you mentioned in registration
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
									placeholder="Password" id="user-profile-password-field">
							</div>
								
							<p class="small text-secondary ml-2 mt-1 mb-2">
								Password combination which is associated with your account
							</p>
						</div>
						<div class="form-group mb-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
										<input type="checkbox" style="width: 20px;"
											id="user-profile-remember">
                                    </div>
                                </div>
                                <input type="text" class="form-control" disabled 
                                    value="Remember me">
							</div>
							
                            <p class="small text-secondary ml-2 mt-1">
                                Toggle this checkbox box if you want to stay logged in for long time
                            </p>
                        </div>

						<div class="d-flex justify-content-end align-items-center">
							<div class="small text-secondary">
								In future here will be OAuth buttons
							</div>

							<div class="btn-group ml-4">
								<a href="/recover" class="btn btn-outline-secondary">
									Recover <span class="fas fa-key ml-1"></span>
								</a>

								<a href="/reg" class="btn btn-outline-secondary">
									Register
								</a>
							</div>

							<button class="btn btn-primary ml-2" disabled
									id="user-profile-login-button">
								Login
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
		<script>loadContext (["login"]);</script>
    </body>
</html>