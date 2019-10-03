<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="col-2">
    <div class="row px-1 pt-2 pb-3">
        <div class="col">
            <h4>Office parts</h4>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-danger" href="/admin">
                        <i class="fas fa-crown mr-2" aria-hidden="true"></i>
                        Administration
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/office/periods">
                        <i class="fas fa-stream mr-2" aria-hidden="true"></i>
                        Periods
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">
                        <i class="fas fa-object-group mr-2" aria-hidden="true"></i>
                        Groups
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/">
                        <i class="fas fa-users mr-2" aria-hidden="true"></i>
                        Users
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <jsp:include page="../navigation.jsp" />
</div>