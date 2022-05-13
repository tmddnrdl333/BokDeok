<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
	<jsp:include page="header.jsp"/>

		<section id="index_section">
			<div class="card col-sm-12 mt-1" style="min-height: 850px;">
				<div class="card-body">
					<div class="form-group form-inline justify-content-center">
						<label class="mr-2" for="sido">시도 : </label> <select
							class="form-control" id="sido">
							<option value="0">선택</option>
						</select> <label class="mr-2 ml-3" for="gugun">구군 : </label> <select
							class="form-control" id="gugun">
							<option value="0">선택</option>
						</select> <label class="mr-2 ml-3" for="dong">읍면동 : </label> <select
							class="form-control" id="dong">
							<option value="0">선택</option>
						</select>
						<!-- <button type="button" id="aptSearchBtn">검색</button> -->
					</div>
					<table class="table mt-2">
						<colgroup>
							<col width="100">
							<col width="160">
							<col width="*">
							<col width="120">
							<col width="120">
						</colgroup>
						<thead>
							<tr>
								<th>번호</th>
								<th>아파트이름</th>
								<th class="text-center">주소</th>
								<th>건축연도</th>
								<th>최근거래금액</th>
							</tr>
						</thead>
						<tbody id="searchResult"></tbody>
					</table>
					<div id="map" style="width: 100%; height: 500px;"></div>
					<script type="text/javascript"
						src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e7d846289bba56ddca255436b222067b&libraries=services"></script>
					<script type="text/javascript" src="js/map.js"></script>
					<script type="text/javascript">
						let colorArr = ['table-success','table-info'];
						$(document).ready(function(){					
							$.get(root + "/map/sido"
								,function(data, status){
									$.each(data, function(index, vo) {
										$("#sido").append("<option value='"+vo.sidoCode+"'>"+vo.sidoName+"</option>");
									});
								}
								, "json"
							);
						});
						$(document).on("change", "#sido", function() {
							$.get(root + "/map/gugun"
									,{sido: $("#sido").val()}
									,function(data, status){
										$("#gugun").empty();
										$("#gugun").append('<option value="0">선택</option>');
										$.each(data, function(index, vo) {
											$("#gugun").append("<option value='"+vo.gugunCode+"'>"+vo.gugunName+"</option>");
										});
									}
									, "json"
							);
						});
						$(document).on("change", "#gugun", function() {
							$.get(root + "/map/dong"
									,{gugun: $("#gugun").val()}
									,function(data, status){
										$("#dong").empty();
										$("#dong").append('<option value="0">선택</option>');
										$.each(data, function(index, vo) {
											$("#dong").append("<option value='"+vo.dongCode+"'>"+vo.dongName+"</option>");
										});
									}
									, "json"
							);
						});
						$(document).on("change", "#dong", function() {
							$.post(root + "/map/apt"
									,{dong: $("#dong").val()}
									,function(data, status){
										$("#searchResult").empty();
										$.each(data, function(index, vo) {
											let str = `
												<tr class="\${colorArr[index%2]}">
												<td id="aptCode">\${vo.aptCode}</td>
												<td id="aptName">\${vo.aptName}</td>
												<td>\${vo.sidoName} \${vo.gugunName} \${vo.dongName} \${vo.jibun}</td>
												<td>\${vo.buildYear}</td>
												<td>\${vo.recentPrice}</td>
											`;
											$("#searchResult").append(str);
										});
										displayMarkers(data);
									}
									, "json"
							);
							
						});
						
						$(document).on("click","#searchResult>tr>td",function(){
							let aptCode = $(this).parents("tr").children("#aptCode").text();
							let aptName = $(this).parents("tr").children("#aptName").text();
							
							
							$.get(root+"/house/"+aptCode,function(list){
								$("#houseDealTitle").html("<strong>"+aptName+"</strong> 매매 정보");
								$.each(list, function(index, hd) {
									$("#houseModalBody").append("<tr><td>"+hd.dealYear+"."+hd.dealMonth+"."+hd.dealDay+"</td>"+"<td>"+hd.area+"</td>"+"<td>"+hd.floor+"</td>"+"<td>"+hd.dealAmount+"</td>"+"</tr>");
								});
								$("#houseDealViewModal").modal();
								
							});
						});
					</script>
				</div>
			</div>
		</section>
	</div>

	<div class="modal" id="houseDealViewModal">
		<div class="modal-dialog">
			<div class="modal-content">
				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title" id="houseDealTitle"></h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				<!-- Modal body -->
				<div class="modal-body">
					<table class="table table-bordered">
						<colgroup>
							<col width="120">
							<col width="*">
							<col width="120">
							<col width="*">
						</colgroup>
						<thead>
							<tr>
								<th>계약일</th>
								<th>면적</th>
								<th>층</th>
								<th>거래금액(만원)</th>
							</tr>
						</thead>
						<tbody id="houseModalBody"></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>


<jsp:include page="user_modal.jsp"/>	
	
	
</body>
</html>