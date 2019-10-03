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

                    <div class="d-flex">
                        <div class="col-7 bg-white border border-top-0">
                            <div class="container d-flex justify-content-start align-items-center mt-4">
                                <h4>Periods</h4>
            
                                <div class="spinner-grow text-primary ml-2" 
                                    id="periods-wall-spinner">
                                </div>
                            </div>

                            <div class="d-flex justify-content-end">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-primary">Apple</button>
                                    <button type="button" class="btn btn-sm btn-primary">Samsung</button>
                                </div>
                            </div>

                            <div class="d-flex align-items-start">
                                <table class="table table-sm mt-2">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Author</th>
                                            <th>Issued</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>
                                                <input class="form-control-plaintext form-control-sm" 
                                                    type="text" placeholder="name fiter" />
                                            </th>
                                            <th>
                                                <input class="form-control-plaintext form-control-sm" 
                                                    type="text" placeholder="status filter" />
                                            </th>
                                            <th>
                                                <input class="form-control-plaintext form-control-sm" 
                                                    type="text" placeholder="author filter" />
                                            </th>
                                            <th>
                                                <input class="form-control-plaintext form-control-sm" 
                                                    type="text" placeholder="issued filter" />
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td></td>
                                            <td>Period #2</td>
                                            <td>Created</td>
                                            <td>Shemplo</td>
                                            <td>03.10.2019</td>
                                            <td>
                                                <i class="fas fa-star" aria-hidden="true"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox" /></td>
                                            <td></td>
                                            <td>Period #1</td>
                                            <td>Registration</td>
                                            <td>Shemplo</td>
                                            <td>03.10.2019</td>
                                            <td>
                                                <i class="fas fa-star" aria-hidden="true"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="d-flex flex-column mt-2 ml-2">
                                    <button class="btn btn-sm mb-2">
                                        <i class="fas fa-filter" aria-hidden="true"></i>
                                    </button>
                                    <button class="btn btn-sm">
                                        <i class="fas fa-sort" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
        
                        <div class="col-5">
                            <p>Period editor</p>
                            <p>Roles assignment</p>
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