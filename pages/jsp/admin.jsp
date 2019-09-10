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
        <title>Admin</title>
    </head>
    
    <body>
    	<h2>Admin</h2>
    	<a href="/">index</a>
    	
    	<h3>Important things</h3>
    	
    	<table border="1">
    		<caption>Group join applications</caption>
    		
    		<tr>
    			<td>#</td>
    			<td>User</td>
    			<td>Period</td>
    			<td>Group</td>
    			<td>Issued</td>
    			<td>Action</td>
    		</tr>
    		
    		<c:choose>
    			<c:when test="${group_join_applications != null && not empty group_join_applications}">
    				<c:forEach var="application" items="${group_join_applications}">
    					<tr>
    						<td>${application.getId ()}</td>
    						<td>${application.getUser ().getLogin ()}</td>
    						<td>${application.getGroup ().getPeriod ().getName ()}</td>
    						<td>${application.getGroup ().getName ()}</td>
    						<td>${application.getIssued ()}</td>
    						<td>
    							<button id="gjoin${application.getId ()}" 
    									class="group-join-apply-button">
   									apply
								</button>
    							<button id="gjoin${application.getId ()}" 
    									class="group-join-reject-button">
   									reject
								</button>
    						</td>
    					</tr>
    				</c:forEach>
    			</c:when>
    			
    			<c:otherwise>
    				<tr>
    					<td colspan="6">No applications now</td>
    				</tr>
    			</c:otherwise>
    		</c:choose>
    	</table>
    	
    	<hr />
    	
    	<p>
    		<button onclick="invalidateCaches ()">invalidate caches</button>
    	</p>
    	
    	<h3>User</h3>
    	
    	<p>
    		<span>Create user: </span>
    		<input id="cuLogin" type="text" placeholder="login" />
    		<input id="cuPhone" type="text" placeholder="phone" />
    		<input id="cuPassword" type="text" placeholder="password" />
    		<button id="cuButton">create</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Registered users:</span>
   				<button id="luButton">load</button>
   				<div id="usersDiv"></div>
			</div>
    	</p>
    	
    	<h3>Option</h3>
    	
    	<p>
    		<span>Create option: </span>
    		<input id="coName" type="text" placeholder="option name" />
    		<button id="coButton">create</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Registered options:</span>
   				<button id="loButton">load</button>
   				<div id="optionsDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<div>
   				<span>Protected methods:</span>
   				<button id="lmButton">load</button>
   				<div id="methodsDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<span>Add method rule: </span>
    		<input id="amrMethod" type="text" placeholder="method name" />
    		<input id="amrOption" type="number" placeholder="option id" />
    		<button id="amrButton">add</button>
    	</p>
    	
    	<p>
    		<span>Remove method rule: </span>
    		<input id="rmrMethod" type="text" placeholder="method name" />
    		<input id="rmrOption" type="number" placeholder="option id" />
    		<button id="rmrButton">remove</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Current methods guard rules:</span>
   				<button id="lrButton">load</button>
   				<div id="rulesDiv"></div>
			</div>
    	</p>
    	
    	<h3>Role</h3>
    	
    	<p>
    		<span>Create role: </span>
    		<input id="crName" type="text" placeholder="role name" />
    		<input id="crTemplate" type="text" placeholder="template name" />
    		<button id="crButton">create</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Registered roles:</span>
   				<button id="lroButton">load</button>
   				<div id="rolesDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<span>Add role option: </span>
    		<input id="aroRole" type="number" placeholder="role id" />
    		<input id="aroOption" type="number" placeholder="option id" />
    		<button id="aroButton">add</button>
    	</p>
    	
    	<p>
    		<span>Remove role option: </span>
    		<input id="rroRole" type="number" placeholder="role id" />
    		<input id="rroOption" type="number" placeholder="option id" />
    		<button id="rroButton">remove</button>
    	</p>
    	
    	<h3>Period</h3>
    	
    	<p>
    		<span>Create period: </span>
    		<input id="cpName" type="text" placeholder="period name" />
    		<input id="cpSince" type="date" />
    		<button id="cpButton">create</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Registered periods:</span>
   				<button id="lpButton">load</button>
   				<div id="periodsDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<span>Change period state: </span>
    		<input id="cpsPeriod" type="number" placeholder="period id" />
    		<input id="cpsStatus" type="text" placeholder="status" />
    		<button id="cpsButton">change</button>
    	</p>
    	
    	<h3>Role assignment</h3>
    	
    	<p>
    		<span>Assign role to user: </span>
    		<input id="artuUser" type="number" placeholder="user id" />
    		<input id="artuPeriod" type="number" placeholder="period id" />
    		<input id="artuRole" type="number" placeholder="role id" />
    		<button id="artuButton">assign</button>
    	</p>
    	
    	<p>
    		<span>Remove role from user: </span>
    		<input id="rrtuUser" type="number" placeholder="user id" />
    		<input id="rrtuPeriod" type="number" placeholder="period id" />
    		<input id="rrtuRole" type="number" placeholder="role id" />
    		<button id="rrtuButton">remove</button>
    	</p>
    	
    	<h3>Period register templates</h3>
    	
    	<p>
    		<div>
   				<span>Templates:</span>
   				<button id="lprtButton">load</button>
   				<div id="templatesDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<div>
   				<span>Registered in period:</span>
   				<input id="lprPeriod" type="number" placeholder="period id" />
   				<button id="lprButton">load</button>
   				<div id="registeredDiv"></div>
			</div>
    	</p>
    	
    	<h3>Personal data retrieving</h3>
    	
    	<p>
    		<div>
   				<span>Personal data:</span>
   				<input id="lpdUser" type="number" placeholder="user id" />
   				<input id="lpdPeriod" type="number" placeholder="period id" />
   				<button id="lpdButton">load</button>
   				<div id="personalDataDiv"></div>
			</div>
    	</p>
    	
    	<h3>Group</h3>
    	
    	<p>
    		<div>
   				<span>Group types:</span>
   				<button id="lgtButton">load</button>
   				<div id="groupTypesDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<span>Create group: </span>
    		<input id="cgName" type="text" placeholder="group name" />
    		<input id="cgPeriod" type="number" placeholder="period id" />
    		<input id="cgType" type="text" placeholder="group type" />
    		<button id="cgButton">create</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Registered groups:</span>
   				<input id="lpgPeriod" type="number" placeholder="period id" />
   				<button id="lpgButton">load</button>
   				<div id="groupsDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<span>Assign group: </span>
    		<input id="agUser" type="number" placeholder="user id" />
    		<input id="agGroup" type="number" placeholder="group id" />
    		<input id="agStatus" type="text" placeholder="status" />
    		<input id="agRole" type="number" placeholder="role id" />
    		<input id="agComment" type="text" placeholder="comment" />
    		<button id="agButton">assign</button>
    	</p>
    	
    	<p>
    		<div>
   				<span>Group assigned:</span>
   				<input id="lgaGroup" type="number" placeholder="group id" />
   				<button id="lgaButton">load</button>
   				<div id="groupMembersDiv"></div>
			</div>
    	</p>
    	
    	<h3>Information post</h3>
    	
    	<p>
    		<span>Publish post: </span>
    		<input id="agpTitle" type="text" placeholder="title" />
    		<input id="agpGroup" type="number" placeholder="group id" />
    		<button id="agpButton">post</button><br />
    		<textarea cols="65" rows="5" id="agpContent"></textarea>
    	</p>
    	
    	<h3>Olympiad</h3>
    	
    	<p>
    		<span>Create olympiad: </span>
    		<input id="colName" type="text" placeholder="olympiad name" />
    		<input id="colGroup" type="number" placeholder="group id" />
    		<input id="colPublish" type="datetime-local" placeholder="publish date" />
    		<input id="colFinish" type="datetime-local" placeholder="finish date" />
    		<input id="colAttempts" type="number" placeholder="attempts" />
    		<button id="colButton">create</button><br />
    		<textarea cols="65" rows="5" id="colDescription"></textarea>
    	</p>
    	
    	<p>
    		<div>
   				<span>Olympiads:</span>
   				<input id="lgoGroup" type="number" placeholder="group id" />
   				<button id="lgoButton">load</button>
   				<div id="olympiadsDiv"></div>
			</div>
    	</p>
    	
    	<p>
    		<span>Create olympiad problem: </span>
    		<input id="colpTitle" type="text" placeholder="problem title" />
    		<input id="colpOlympiad" type="number" placeholder="olympiad id" />
    		<input id="colpCost" type="number" placeholder="cost" />
    		<input id="colpDifficulty" type="number" placeholder="difficulty" />
    		<button id="colpButton">create</button><br />
    		<textarea cols="65" rows="5" id="colpContent"></textarea>
    	</p>
    	
    	<script src="/resources/js/admin.js"></script>
    </body>
</html>