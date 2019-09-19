<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="col-3">
    <jsp:include page="navigation.jsp" />
    
    <div class="row px-1 py-2">
        <div class="col">
			<input type="hidden" value="${user != null && user.getId () > 0}"
				id="user-profile-authorized" />

            <c:choose>
            	<c:when test="${user != null && user.getId () > 0}">
					<h4>Welcome, <code>${user.getLogin ()}</code></h4>
           			
           			<div class="pl-3 mt-3">
           				<i class="fas fa-star mr-2" aria-hidden="true"></i>
           				Your reputation: 
           				<h5 class="d-inline text-success">+45</h5>
           			</div>
           			
           			<ul class="nav flex-column mt-2 mb-3">
			            <li class="nav-item">
			                <a class="nav-link" href="/">
			                    <i class="fas fa-wrench mr-2" aria-hidden="true"></i>
			                    Profile settings
			                </a>
			            </li>
			            <li class="nav-item">
			                <a class="nav-link" href="/">
			                    <i class="fas fa-comments mr-2" aria-hidden="true"></i>
			                    Conversations
			                </a>
			            </li>
			            <li class="nav-item">
			                <a class="nav-link" href="/">
			                    <i class="fas fa-blog mr-2" aria-hidden="true"></i>
			                    Personal blog
			                </a>
			            </li>
			        </ul>
        
            		<div class="d-flex align-items-center">
						<button class="btn btn-sm btn-outline-secondary"
								id="user-profile-logout-button">
	                        Log out
						</button>

						<div class="spinner-grow spinner-grow-sm text-primary ml-2" 
							id="user-profile-spinner"></div>
	                </div>
            	</c:when>
            	
            	<c:otherwise>
					<h4>Profile</h4>
            	
            		<p class="pl-3 py-1">Login or register on site to continue work</p>
		            <form class="pl-3">
		                <div class="input-group input-group-sm mb-3">
		                    <div class="input-group-prepend">
		                        <span class="input-group-text">@</span>
		                    </div>
							<input type="text" class="form-control"
								id="user-profile-login-field" 
		                        placeholder="Username">
		                </div>
		                <div class="input-group input-group-sm mb-3">
		                    <div class="input-group-prepend">
		                        <span class="input-group-text">
		                            <span class="fas fa-key"></span>
		                        </span>
		                    </div>
							<input type="password" class="form-control"
								id="user-profile-password-field" 
		                        placeholder="Password">
		                </div>
		
		                <div class="d-flex justify-content-end align-items-center">
							<div class="spinner-grow spinner-grow-sm text-primary mr-2" 
								id="user-profile-spinner"></div>

							<div class="btn-group">
								<a class="btn btn-sm btn-outline-secondary" href="/reg">
									Register
								</a>
								<a class="btn btn-sm btn-outline-secondary" href="/login">
									Advanced
								</a>
							</div>
							<button class="btn btn-sm btn-primary ml-2"
									id="user-profile-login-button">
		                        Login
							</button>
		                </div>
		            </form>
            	</c:otherwise>
            </c:choose>
        </div>
    </div>
    <!--
    <div class="row px-1 py-2">
        <div class="col">
            <h4>Discussions</h4>
            <div class="text-left px-3 py-1">
                <div class="spinner-border spinner-border-sm mr-2"></div>
                <span>Loading...</span>
            </div>
            <div class="text-left px-3 py-1">
                <span>No active discussions now. Wait for them or comment some blog to start new one...</span>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed.
                </li>
                <li class="list-group-item">
                    Praesent eget ipsum eros. Nam tincidunt fringilla felis, sit amet aliquet metus finibus sed.
                </li>
            </ul>
        </div>
    </div>
    <div class="row px-1 py-2">
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search">
            <div class="input-group-append">
                <button class="btn btn-success" type="submit">Go</button> 
            </div>
        </div>
    </div>
    -->
</div>