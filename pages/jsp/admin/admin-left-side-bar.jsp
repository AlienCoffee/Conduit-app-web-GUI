<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="col-2">
    <div class="row px-1 pt-2 pb-3">
        <div class="col">
            <h4>Administration</h4>
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link text-danger" href="/office">
                        <i class="fas fa-paperclip mr-2" aria-hidden="true"></i>
                        Office panel
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <jsp:include page="../navigation.jsp" />
</div>