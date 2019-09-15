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
        <title>Conduit :: Periods</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="resources/css/common.css"/>
        
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
					<div class="d-flex justify-content-start align-items-center mt-4 ml-1">
                        <h2>Available periods</h2>
    
						<div class="spinner-grow text-primary ml-2" 
							id="wall-spinner"></div>
                    </div>

					
					<div class="row mb-5">
						<div class="text-left p-2 ml-3" id="periods-wall-nothing">
							<span>
								Hm. Seems to be nothing here. 
								Maybe here will appear something soon...
							</span>
						</div>

						<div class="col-9">
							<ul class="list-group" id="periods-wall">
								<!--
								<li class="list-group-item list-group-item-action">
									<div class="d-flex justify-content-between">
										<h5>Period #3</h5>
										<div>
											<button class="btn btn-sm btn-link">
												registration
											</button>
											<button class="btn btn-sm btn-link">
												<span class="fas fa-info"></span>
											</button>
										</div>
									</div>
									<div class="text-secondary">
										<span class="fas fa-calendar" aria-hidden="true"></span>
										<small class="mr-3">
											28.07.2019 - 14.09.2020
										</small>

										<span class="fas fa-book" aria-hidden="true"></span>
										<small class="mr-3">
											registration
										</small>

										<span class="fas fa-user" aria-hidden="true"></span>
										<small class="mr-3">
											Shemplo
										</small>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat
										bibendum
										nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio
										convallis
										augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor.
									</p>
								</li>
								<li class="list-group-item list-group-item-action">
									<div class="d-flex justify-content-between">
										<h5>Period #2</h5>
										<div>
											<button class="btn btn-sm btn-link">
												<span class="fas fa-info"></span>
											</button>
										</div>
									</div>
									<div class="text-secondary">
										<span class="fas fa-calendar" aria-hidden="true"></span>
										<small class="mr-3">
											08.03.2018 - 18.03.2020
										</small>

										<span class="fas fa-book" aria-hidden="true"></span>
										<small class="mr-3">
											in process
										</small>

										<span class="fas fa-user" aria-hidden="true"></span>
										<small class="mr-3">
											Shemplo
										</small>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat
										bibendum
										nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio
										convallis
										augue, ac malesuada velit dolor eget lorem.
									</p>
								</li>
								<li class="list-group-item list-group-item-action">
									<div class="d-flex justify-content-between">
										<h5>Period #1</h5>
										<div>
											<button class="btn btn-sm btn-link">
												<span class="fas fa-info"></span>
											</button>
										</div>
									</div>
									<div class="text-secondary">
										<span class="fas fa-calendar" aria-hidden="true"></span>
										<small class="mr-3">
											22.04.2017 - 03.11.2019
										</small>

										<span class="fas fa-book" aria-hidden="true"></span>
										<small class="mr-3">
											in process
										</small>

										<span class="fas fa-user" aria-hidden="true"></span>
										<small class="mr-3">
											Shemplo
										</small>
									</div>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt erat
										bibendum
										nunc dapibus sagittis. Etiam tincidunt, turpis at pharetra aliquet, metus odio
										convallis
										augue, ac malesuada velit dolor eget lorem. Ut feugiat dignissim tortor.
									</p>
								</li>
								-->
							</ul>
						</div>

						<div class="col">
							<div class="d-flex mb-2">
								<button class="btn btn-sm btn-outline-secondary">
									<i class="fas fa-sync mr-2" aria-hidden="true"></i>
									Reload periods list
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
									Create new period
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
		
		<script type="text/javascript" src="resources/lib/require.2.3.6.js"></script>
		<script type="text/javascript" src="resources/js/ui.js"></script>
		<script>loadContext (["periods"]);</script>
    </body>
</html>