<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<header class="mb-5">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="d-flex align-items-center mr-auto">
            <img src="/resources/gfx/diary.svg" class="logo-image mr-1" />
            <a class="navbar-brand" href="/">Conduit</a>
            <sub class="text-light">
                educational platform
            </sub>
        </div>

        <c:if test="${is_service_page}">
            <div class="d-flex align-items-center">
                <div class="input-group input-group-sm mr-4">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Period</span>
                    </div>
                    <select id="office-period-selector" class="form-control">
                        <c:forEach var="period" items="${periods}">
                            <option value="${period.getId ()}">
                                ${period.getName ()}
                            </option>
                        </c:forEach>
                    </select>
                </div>
                <button class="btn btn-sm btn-secondary"
                        style="min-width: 80px">
                    Log out
                </button>
            </div>
        </c:if>
    </nav>
</header>