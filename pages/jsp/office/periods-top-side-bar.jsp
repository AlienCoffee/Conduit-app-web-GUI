<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="">
    <ul class="nav nav-tabs">
        <c:if test="${is_system_period_selected}">
            <li class="nav-item">
                <a class="nav-link ${tab eq 'management' ? 'active' : ''}" href="/office/periods">Management</a>
            </li>
        </c:if>
        <c:if test="${not is_system_period_selected}">
            <li class="nav-item">
                <a class="nav-link ${tab eq 'applications' ? 'active' : ''}" href="/office/periods-applications">
                    Applications
                    <c:if test="${active_applications > 0}">
                        <span class="badge badge-secondary ml-1">
                            ${active_applications}
                        </span>
                    </c:if>
                </a>
            </li>
        </c:if>
        <li class="nav-item">
            <a class="nav-link" href="#">Statistics</a>
        </li>
    </ul>
</div>