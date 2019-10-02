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
        <title>Conduit :: Period - ${period.getName ()}</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/resources/css/common.css"/>
        
        <link rel="shortcut icon" href="/resources/gfx/diary.png" 
			type="image/x-icon" />
    </head>
    
    <body>
		<input type="hidden" value="${period.getId ()}" id="period-id"/>
		<input type="hidden" value="${have_access_to_groups}"
			id="groups-wall-access" />

		<div class="px-4 popup-layer" id="popup"></div>
		
		<jsp:include page="../header.jsp" />

    	<main class="container">
			<div class="row">
				<jsp:include page="../left-side-bar.jsp" />

				<div class="col-9">
					<div class="d-flex justify-content-start align-items-center mt-4 ml-1">
                        <h2>${period.getName ()}</h2>
                    </div>
	
					<div class="text-secondary">
						<span data-toggle="tooltip" data-placement="bottom" title="Issued date"
								class="cursor-none">
							<span class="fas fa-calendar-day" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getIssued ()}
							</small>
						</span>

						<span data-toggle="tooltip" data-placement="bottom" title="Author"
								class="cursor-none">
							<span class="fas fa-user" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getAuthor ().getLogin ()}
							</small>
						</span>

						<span data-toggle="tooltip" data-placement="bottom" title="Duration"
								class="cursor-none">
							<span class="fas fa-calendar-week" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getSince ()} - ${period.getUntil ()}
							</small>
						</span>

						<span data-toggle="tooltip" data-placement="bottom" title="Status"
								class="cursor-none">
							<span class="fas fa-book" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getStatus ()}
							</small>
						</span>
					</div>

					<c:if test="${have_assigned_roles}">
						<div class="small text-secondary">
							<span data-toggle="tooltip" data-placement="bottom" title="Roles"
									class="cursor-none">
								<span class="fas fa-stamp" aria-hidden="true"></span>
								<span class="ml-1">
									<c:forEach var="role" items="${assigned_roles}">
										<mark>${role.getTemplate ().getName ()}</mark>
									</c:forEach>
								</span>
							</span>
							- read more about 
							<a href="#">roles</a> 
							in period
						</div>
					</c:if>
	
					<p class="mt-2">
						${period.getDescription ()}
					</p>
	
					<c:if test="${period.status eq 'REGISTRATION'}">
						<div class="container border rounded mt-4 mb-2 py-3">
							<div class="d-flex justify-content-between">
								<h5>
									Registration for this period is available
								</h5>
		
								<a href="/period/${period.getId ()}/reg" 
										class="btn btn-sm btn-primary">
									Register now
								</a>
							</div>

							<c:choose>
								<c:when test="${have_registered_roles}">
									<div class="d-flex">
										<span>You have already registered for roles: </span>
										<div class="ml-2">
											<c:forEach var="role" items="${applicated_roles}">
												<mark>${role.getTemplate ().getName ()}</mark>
											</c:forEach>
										</div>
									</div>
								</c:when>

								<c:otherwise>
									<div>You did not register for this period yet.</div>
								</c:otherwise>
							</c:choose>
						</div>
					</c:if>
	
					<div class="container d-flex justify-content-start align-items-center mt-4">
						<h4>Available groups</h4>
	
						<div class="spinner-grow text-primary ml-2" 
							id="groups-wall-spinner">
						</div>
					</div>
	
					<c:choose>
						<c:when test="${have_access_to_groups}">
							<div class="row mb-5">
								<div class="col-9">
									<div class="text-left p-2" id="groups-wall-nothing">
										<span>
											Hm. Seems to be nothing here. 
											Maybe here will appear something soon...
										</span>
									</div>
									
									<ul class="list-group" id="groups-wall"></ul>
								</div>
			
								<div class="col">
									<div class="d-flex mb-2">
										<button class="btn btn-sm btn-outline-secondary"
												id="groups-wall-update">
											<i class="fas fa-sync mr-2" aria-hidden="true"></i>
											Reload groups list
										</button>
									</div>
			
									<div class="d-flex mb-4">
										<button class="btn btn-sm btn-outline-secondary">
											<i class="fas fa-archive mr-2" aria-hidden="true"></i>
											Open archive
										</button>
									</div>
			
									<div class="d-flex mb-4">
										<button class="btn btn-sm btn-outline-success">
											<i class="fas fa-plus mr-2" aria-hidden="true"></i>
											Create new group
										</button>
									</div>

									<!--
									<div class="d-flex mb-4">
										<p>Roles: </p>
										<ul>
											<li>Student</li>
											<li>Teacher</li>
										</ul>
									</div>
									-->
								</div>
							</div>
						</c:when>

						<c:otherwise>
							<div>You don't have enough rights to see list of groups</div>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</main>

		<footer>

		</footer>

		<jsp:include page="../bootstrap.jsp" />
		
		<script type="text/javascript" src="/resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="/resources/js/ui.js"></script>
		<script>loadContext ("../", ["period"]);</script>
    </body>
</html>