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
		<title>Conduit :: Period registration</title>

		<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/resources/css/common.css"/>
        
        <link rel="shortcut icon" href="/resources/gfx/diary.png" 
			type="image/x-icon" />
    </head>
    
    <body>
		<input type="hidden" value="${period.getId ()}" id="period-id"/>
		<input type="hidden" value="${user.getId ()}" id="user-id"/>
		<div class="px-4 popup-layer" id="popup"></div>
		
    	<jsp:include page="../header.jsp" />
        
        <main class="container">
            <div class="row">
				<jsp:include page="../left-side-bar.jsp" />

				<div class="col-6">
					<div class="d-flex justify-content-start align-items-center mt-4 ml-1">
                        <h2>Registration in period</h2>
    
						<div class="spinner-grow text-primary ml-2" 
							id="reg-spinner"></div>
                    </div>

					<div>
						<a class="btn btn-sm btn-outline-secondary ml-1"
								href="/period/${period.getId ()}">
							<span class="fas fa-arrow-left mr-2"></span>
							<span>back to period page</span>
						</a>
					</div>

					<c:choose>
						<c:when test="${period.getStatus () eq 'REGISTRATION'}">
							<div class="form-group mt-5">
								<label for="reg-role-select">
									<span class="fas fa-user mx-2"></span>
									Choose role to register for:
								</label>
								<select class="form-control" 
									id="reg-role-select">
								</select>
							</div>
		
							<c:choose>
								<c:when test="${have_assigned_roles}">
									<div class="d-flex">
										<span>You have already registered for roles: </span>
										<!--
										<div class="ml-2">
											<mark>Teacher</mark>,
											<mark>Org. committee</mark>
										</div>.
										-->
									</div>
								</c:when>

								<c:otherwise>
									<div>
										You did not register for this period yet.
									</div>
								</c:otherwise>
							</c:choose>
		
							<h4 class="mt-5 hidden" id="reg-title">
								Registration for 
								<mark id="reg-form-role"></mark> 
								role
							</h4>
		
							<form class="container mt-3 mb-5 hidden" id="reg-form">
								<h5>
									<span class="fas fa-address-card mx-2 my-3"></span>
									Personal data
								</h5>
		
								<div class="container">
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Last name</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">First name</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Second name</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Birthday</span>
											</div>
											<input type="date" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Gender</span>
											</div>
											<select class="form-control">
												<option>Male</option>
												<option>Female</option>
											</select>
										</div>
									</div>
								</div>
		
								<h5>
									<span class="fas fa-id-card mx-2 my-3"></span>
									ID document
								</h5>
		
								<div class="container">
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Type</span>
											</div>
											<select class="form-control">
												<option>Passport</option>
												<option>Birth sertificate</option>
											</select>
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Series</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Number</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">...</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
								</div>
		
								<h5>
									<span class="fas fa-home mx-2 my-3"></span>
									Living place
								</h5>
		
								<div class="container">
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">Region</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
									<div class="form-group">
										<div class="input-group input-group-sm">
											<div class="input-group-prepend">
												<span class="input-group-text" style="width: 100px;">City / Town</span>
											</div>
											<input type="text" class="form-control" id="first-name">
										</div>
									</div>
								</div>
		
								<h5>
									<span class="fas fa-handshake mx-2 my-3"></span>
									Almost done
								</h5>
		
								<div class="container">
									<div class="form-check-inline">
										<label class="form-check-label">
											<input type="checkbox" class="form-check-input" value="">
											Consent to the processing of personal data
											(<a href="#">conditions</a>)
										</label>
									</div>
								</div>
		
								<div class="container d-flex justify-content-end mt-3">
									<button class="btn btn-sm btn-primary">Register</button>
								</div>
							</form>
						</c:when>

						<c:otherwise>
							<p>Registration is closed for this period</p>
						</c:otherwise>
					</c:choose>
				</div>
				<div class="col-3"></div>
            </div>
        </main>

        <footer>

        </footer>

		<jsp:include page="../bootstrap.jsp" />
		
		<script type="text/javascript" src="/resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="/resources/js/ui.js"></script>
		<script>loadContext ("../../", ["period-reg"]);</script>
    </body>
</html>