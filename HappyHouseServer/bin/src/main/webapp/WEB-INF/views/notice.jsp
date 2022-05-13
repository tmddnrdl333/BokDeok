<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Framework Project</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" href="img/favicon.ico">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="/css/apt.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
	<jsp:include page="header.jsp" />

	<!-- 앞부분 include -->

	<section id="index_section">
		<div class="card col-sm-12 mt-1" style="min-height: 850px;">
			<div class="card-body">
				<div class="form-group form-inline justify-content-end"></div>
				<div class="form-group form-inline justify-content-end">
					<form class="navbar-search text-right" action="${root}/notice"
						method="get">
						작성자 : <input type="text" class="search-query w-25" name="userName"
							value="${condition.userName}" /> 제목 : <input type="text"
							class="search-query w-25" name="subject"
							value="${condition.subject}" /> <input type="submit"
							class="btn btn-info btn-sm" value="검색" />
					</form>
				</div>
				<table class="table mt-2">
					<colgroup>
						<col width="100">
						<col width="*">
						<col width="100">
						<col width="120">
						<col width="*">
					</colgroup>
					<thead>
						<tr>
							<th class="text-center">글 번호</th>
							<th class="text-center">제목</th>
							<th class="text-center">작성자</th>
							<th class="text-center">작성일</th>
						</tr>
					</thead>
					<tbody id="searchResult">
						<c:forEach items="${list}" var="dto">
							<tr>
								<td id="noticeNo">${dto.noticeNo}</td>
								<td>${dto.subject}</td>
								<td>${dto.userName}</td>
								<td>${dto.regTime}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<div class="form-group form-inline justify-content-end">
					<button id="showRegistModal" class="btn btn-primary btn-sm">글
						등록</button>
				</div>
				<!-- 이거 연결시키기 -->

				<script type="text/javascript">
					$(document).ready(function(){
					});
				
					$(document).on("click", "#showRegistModal", function() {
						$("#noticeRegistModal").modal();
					});
					
					$(document).on("click","#searchResult>tr>td",function(){
						let noticeNo = $(this).parents("tr").children("#noticeNo").text();						
						$.get("/notice/article/"+noticeNo, function(noticeDto){
							$("#subject").val(noticeDto.subject);
							$("#content").text(noticeDto.content);
							$("#noticeNo").val(noticeDto.noticeNo);
							$("#noticeViewModal").modal();
							$("#viewModalForm").attr("action","${root}/notice/auth/modify/"+noticeNo);
							$("#removeNotice").attr("formaction","${root}/notice/auth/remove/"+noticeNo);
						});
					});
					
					
				</script>

			</div>
		</div>
	</section>

	<jsp:include page="notice_modal.jsp" />
	<jsp:include page="user_modal.jsp" />

</body>
</html>