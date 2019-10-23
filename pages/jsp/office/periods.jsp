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
        <title>Conduit :: Admin :: Periods management</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/resources/css/common.css"/>

		<link rel="shortcut icon" href="/resources/gfx/diary.png" 
			type="image/x-icon" />
    </head>
    
    <body>
		<div class="px-4 popup-layer" id="popup"></div>
        
    	<jsp:include page="../header.jsp" />
        
        <main class="mx-5">
            <div class="row">
                <jsp:include page="office-left-side-bar.jsp" />

                <div class="col-10">
                    <jsp:include page="periods-top-side-bar.jsp" />

                    <div class="d-flex align-items-start mb-5">
                        <div class="col-7 bg-white border border-top-0">
                            <div class="container d-flex justify-content-start align-items-center mt-4">
                                <h4>Periods</h4>
            
                                <div class="spinner-grow text-primary ml-2" 
                                    id="periods-table-spinner">
                                </div>
                            </div>

                            <div class="d-flex justify-content-end">
                                <!--
                                <div class="btn-group mr-2">
                                    <button type="button" class="btn btn-sm btn-secondary">
                                        <i class="fas fa-plus mr-1" aria-hidden="true"></i>
                                        [some text]
                                    </button>
                                </div>
                                -->
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-success"
                                            id="new-period-button">
                                        <i class="fas fa-plus mr-1" aria-hidden="true"></i>
                                        New period
                                    </button>
                                </div>
                            </div>

                            <div class="d-flex align-items-start mt-2"
                                id="periods-table">
                            </div>
                        </div>
        
                        <div class="col-5">
                            <div class="container d-flex justify-content-start align-items-center mt-4">
                                <h4>Period editor</h4>
            
                                <div class="spinner-grow text-primary ml-2 hidden" 
                                    id="period-editor-spinner">
                                </div>
                            </div>

                            <div class="ml-3 mt-3" id="period-editor-stub">
                                Click on period in table or click on 
                                <mark>New period</mark> button 
                                to activate this part
                            </div>

                            <div class="ml-3 mt-3 hidden" id="period-editor-div">
                                <div class="form-group mb-3">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text w-70px">
                                                Title
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" 
                                            id="period-editor-title" 
                                            maxlength="128">
                                    </div>
                                        
                                    <p class="small text-secondary ml-2 mt-1 mb-2">
                                        Title must be up to <b>128 characters</b> in length
                                    </p>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text w-70px">
                                                Desc.
                                            </span>
                                        </div>
                                        <textarea class="form-control min-height-50px"
                                            id="period-editor-desc">
                                        </textarea>
                                    </div>
                                        
                                    <p class="small text-secondary ml-2 mt-1 mb-2">
                                        Description helps users to know more about period
                                    </p>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text w-70px">
                                                Status
                                            </span>
                                        </div>
                                        <select class="form-control" id="period-editor-status">
                                            <c:forEach var="status" items="${period_statuses}">
                                                <option value="${status.name ()}">
                                                    ${status.getName ()}
                                                </option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                        
                                    <p class="small text-secondary ml-2 mt-1 mb-2">
                                        Status helps to understand what happens with period now
                                    </p>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text w-70px">
                                                Since
                                            </span>
                                        </div>
                                        <input type="date" class="form-control" 
                                            id="period-editor-since-date" >
                                        <input type="time" class="form-control" 
                                            id="period-editor-since-time">
                                    </div>
                                        
                                    <p class="small text-secondary ml-2 mt-1 mb-2">
                                        Since shows when period status will be set to 
                                        <i>RUNNING</i> automaticly (can't be empty)
                                    </p>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text w-70px">
                                                Until
                                            </span>
                                        </div>
                                        <input type="date" class="form-control" 
                                            id="period-editor-until-date">
                                        <input type="time" class="form-control" 
                                            id="period-editor-until-time">
                                    </div>
                                        
                                    <p class="small text-secondary ml-2 mt-1 mb-2">
                                        Until shows when period status will be set to 
                                        <i>FINISHED</i> automaticly (can be empty)
                                    </p>
                                </div>

                                <div class="form-group mb-3">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text w-70px">
                                                Issued
                                            </span>
                                        </div>
                                        <input type="date" class="form-control" 
                                            id="period-editor-issued-date" disabled>
                                        <input type="time" class="form-control" 
                                            id="period-editor-issued-time" disabled>
                                    </div>
                                        
                                    <p class="small text-secondary ml-2 mt-1 mb-2">
                                        Issued shows when this period was created
                                    </p>
                                </div>

                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-outline-secondary mr-2" id="period-editor-save">
                                        <i class="fas fa-ban mr-1" aria-hidden="true"></i>
                                        Cancel
                                    </button>
                                    <button class="btn btn-primary" id="period-editor-save">
                                        <i class="fas fa-save mr-1" aria-hidden="true"></i>
                                        Save
                                    </button>
                                </div>
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
		<script>loadContext ("../", ["office/periods"]);</script>
    </body>
</html>