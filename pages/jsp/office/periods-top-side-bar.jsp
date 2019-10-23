<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <a class="nav-link ${tab eq 'management' ? 'active' : ''}" href="/office/periods">Management</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${tab eq 'applications' ? 'active' : ''}" href="/office/periods-applications">
                Applications
                <span class="badge badge-secondary ml-1">2</span>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Statistics</a>
        </li>
    </ul>
</div>