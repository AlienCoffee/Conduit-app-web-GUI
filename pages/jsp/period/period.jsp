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
		<div class="px-4 popup-layer" id="popup"></div>
		
		<jsp:include page="../header.jsp" />

    	<main class="container">
			<div class="row">
				<jsp:include page="../left-side-bar.jsp" />

				<div class="col-9">
					<h2>${period.getName ()}</h2>
	
					<div class="text-secondary">
						<span data-toggle="tooltip" data-placement="bottom" title="Issued date">
							<span class="fas fa-calendar-day" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getIssued ()}
							</small>
						</span>

						<span data-toggle="tooltip" data-placement="bottom" title="Author">
							<span class="fas fa-user" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getAuthor ().getLogin ()}
							</small>
						</span>

						<span data-toggle="tooltip" data-placement="bottom" title="Duration">
							<span class="fas fa-calendar-week" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getSince ()} - ${period.getUntil ()}
							</small>
						</span>

						<span data-toggle="tooltip" data-placement="bottom" title="Status">
							<span class="fas fa-book" aria-hidden="true"></span>
							<small class="mr-3 ml-1">
								${period.getStatus ()}
							</small>
						</span>
					</div>
	
					<p class="mt-2">
						${period.getDescription ()}
					</p>
	
					<div class="container border rounded mt-4 mb-2 py-3">
						<div class="d-flex justify-content-between">
							<h5>
								Registration for this period is available
							</h5>
	
							<button class="btn btn-sm btn-primary">
								Register right now
							</button>
						</div>
						<div>
							You did not register for this period yet.
						</div>
						<div class="d-flex">
							<span>You have already registered for roles: </span>
							<div class="ml-2">
								<mark>Teacher</mark>,
								<mark>Org. committee</mark>
							</div>.
						</div>
					</div>
	
					<div class="container d-flex justify-content-start align-items-center mt-4">
						<h4>Available groups</h4>
	
						<div class="spinner-grow text-primary ml-2"></div>
					</div>
	
					<div class="row mb-5">
						<div class="col-9">
							<div class="text-left p-2">
								<span>Hm. Seems to be nothing here. Maybe here will appear something soon...</span>
							</div>
							<ul class="list-group">
								<li class="list-group-item list-group-item-action">
									<div class="d-flex justify-content-between">
										<h5>Group #3</h5>
										<div>
											<button class="btn btn-sm btn-outline-primary">
												Join group
											</button>
											<button class="btn btn-sm btn-link">
												<span class="fas fa-info"></span>
											</button>
										</div>
									</div>
									<div class="text-secondary mb-1">
										<span class="fas fa-calendar-day" aria-hidden="true"></span>
										<small class="mr-3">
											31.07.2019
										</small>
	
										<span class="fas fa-paw" aria-hidden="true"></span>
										<small class="mr-3">
											study
										</small>
	
										<span class="fas fa-user" aria-hidden="true"></span>
										<small class="mr-3">
											Shemplo
										</small>
	
										<span class="fas fa-users" aria-hidden="true"></span>
										<small class="mr-3">
											<span>23</span> members
										</small>
	
										<span class="fas fa-unlock-alt" aria-hidden="true"></span>
										<small class="mr-3">
											join by application
										</small>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat
										bibendum nunc dapibus sagittis.</p>
								</li>
								<li class="list-group-item list-group-item-action">
									<div class="d-flex justify-content-between">
										<h5>Group #2</h5>
										<div>
											<button class="btn btn-sm btn-link">
												<span class="fas fa-info"></span>
											</button>
										</div>
									</div>
									<div class="text-secondary mb-1">
										<span class="fas fa-calendar-day" aria-hidden="true"></span>
										<small class="mr-3">
											30.07.2019
										</small>
	
										<span class="fas fa-paw" aria-hidden="true"></span>
										<small class="mr-3">
											study
										</small>
	
										<span class="fas fa-user" aria-hidden="true"></span>
										<small class="mr-3">
											Shemplo
										</small>
	
										<span class="fas fa-users" aria-hidden="true"></span>
										<small class="mr-3">
											<span>21</span> members
										</small>
	
										<span class="fas fa-unlock-alt" aria-hidden="true"></span>
										<small class="mr-3">
											join by invitation
										</small>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat
										bibendum nunc dapibus sagittis.</p>
								</li>
								<li class="list-group-item list-group-item-action">
									<div class="d-flex justify-content-between">
										<h5>Group #1</h5>
										<div>
											<button class="btn btn-sm btn-link">
												<span class="fas fa-info"></span>
											</button>
										</div>
									</div>
									<div class="text-secondary mb-1">
										<span class="fas fa-calendar-day" aria-hidden="true"></span>
										<small class="mr-3">
											29.07.2019
										</small>
	
										<span class="fas fa-paw" aria-hidden="true"></span>
										<small class="mr-3">
											elimination
										</small>
	
										<span class="fas fa-user" aria-hidden="true"></span>
										<small class="mr-3">
											Shemplo
										</small>
	
										<span class="fas fa-users" aria-hidden="true"></span>
										<small class="mr-3">
											<span>316</span> members
										</small>
	
										<span class="fas fa-unlock-alt" aria-hidden="true"></span>
										<small class="mr-3">
											free to join
										</small>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat
										bibendum nunc dapibus sagittis.</p>
								</li>
							</ul>
						</div>
	
						<div class="col">
							<div class="d-flex mb-2">
								<button class="btn btn-sm btn-outline-secondary">
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
	
							<div class="d-flex mb-2">
								<button class="btn btn-sm btn-outline-success">
									<i class="fas fa-plus mr-2" aria-hidden="true"></i>
									Create new group
								</button>
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
		<script>loadContext ("../", ["period"]);</script>
    </body>
</html>