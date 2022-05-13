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
<style>
.wrapper {
	width: 400px;
	height: 200px;
	box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.multi-range-slider {
	position: relative;
	/* left : 30px; */
	width: 70%;
	height: 20px;
	display: block;
}

input[type=range] {
	-webkit-appearance: none;
	width: 100%;
	background: transparent;
	-moz-appearance: none;
	appearance: none;
	position: absolute;
	z-index: 10;
	height: 100%;
	margin: 0;
	pointer-events: none;
}

input[type=range]::-webkit-slider-thumb {
	-webkit-appearance: none;
}

input[type=range]:focus {
	outline: none;
}

input[type=range]::-webkit-slider-thumb {
	pointer-events: all;
	-webkit-appearance: none;
	cursor: pointer;
	border: 0 none;
	width: 15px;
	height: 15px;
	background-color: #2698D9;
	border-radius: 50%;
	box-shadow: 0 0 0 0 rgba(38, 152, 217, 0.1);
	transition: box-shadow 0.3s ease-in-out;
}

input[type=range]::-webkit-slider-runnable-track {
	background: transparent;
}

input[type=range]:focus::-webkit-slider-runnable-track {
	background: transparent;
}

.slider {
	position: absolute;
	width: 100%;
	top: 7px;
	z-index: 1;
	height: 6px;
}

.slider>.track {
	position: absolute;
	z-index: 1;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	border-radius: 5px;
	background-color: #EDEDED;
}

.slider>.range {
	position: absolute;
	z-index: 2;
	left: 25%;
	right: 25%;
	top: 0;
	bottom: 0;
	border-radius: 5px;
	background-color: #2698D9;
}

.span__wrapper {
	position: relative;
	/* left : 30px; */
	display: flex;
	justify-content: space-between;
	font-size: 13px;
	margin-bottom: 20px;
	width: 70%;
}
</style>

</head>
<body>
	<jsp:include page="header.jsp" />
	<div class=" p-5">
		<h3 class="pb-3 border-bottom">관심 지역</h3>
		<div id="parent" class="form-group form-inline justify-content-center">
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
			<div class="col-md-auto">
				<button type="button" class="btn" id="addloc">추가</button>
			</div>

			<!-- <button type="button" id="aptSearchBtn">검색</button> -->
		</div>
		<ul class="list-unstyled" id="interestlocList">

		</ul>
	</div>
	<div class="wrapper">
		<div>가격대</div>
		<div class="multi-range-slider">
			<input type="range" id="price_input_left" min="50" step="5" max="10000" value="0"> 
			<input type="range" id="price_input_right" min="50" step="5" max="10000" value="10000">

			<div class="slider" id="price_slider">
				<div class="track"></div>
				<div class="range" id="price_range"></div>
			</div>
		</div>
		<div class="span__wrapper">
			<span class="price-from"></span> <span class="price-to"></span>
		</div>
		<div>면적</div>
		<div class="multi-range-slider">
			<input type="range" id="area_input_left" min="10" step="5" max="300" value="0"> 
			<input type="range" id="area_input_right" min="10" step="5" max="300" value="300">

			<div class="slider" id="area_slider">
				<div class="track"></div>
				<div class="range" id="area_range"></div>
			</div>
		</div>
		<div class="span__wrapper">
			<span class="area-from"></span> <span class="area-to"></span>
		</div>
	</div>

	<script>
	let priceInputLeft = document.getElementById("price_input_left");
	let priceInputRight = document.getElementById("price_input_right");
	let priceRange = document.querySelector("#price_slider > #price_range");
	let priceFrom = document.querySelector(".price-from");
	let priceTo = document.querySelector(".price-to");
	
	function setPriceLeftValue() {
	  let _this = priceInputLeft,
	    min = parseInt(_this.min),
	    max = parseInt(_this.max);

	  _this.value = Math.min(parseInt(_this.value),parseInt(priceInputRight.value) - 5);
	  priceFrom.textContent = _this.value * 100;
	  let percent = ((_this.value - min) / (max - min)) * 100;
	  priceRange.style.left = percent + "%";
	}
	setPriceLeftValue();

	function setPriceRightValue() {
	  let _this = priceInputRight,
	    min = parseInt(_this.min),
	    max = parseInt(_this.max);

	  _this.value = Math.max(parseInt(_this.value), parseInt(priceInputLeft.value) + 5);
	  priceTo.textContent = _this.value * 100;
	  let percent = ((_this.value - min) / (max - min)) * 100;
	  priceRange.style.right = 100 - percent + "%";
	}

	setPriceRightValue();

	priceInputLeft.addEventListener("input", setPriceLeftValue);
	priceInputRight.addEventListener("input", setPriceRightValue);

	let areaInputLeft = document.getElementById("area_input_left");
	let areaInputRight = document.getElementById("area_input_right");
	let areaRange = document.querySelector("#area_slider > #area_range");
	let areaFrom = document.querySelector(".area-from");
	let areaTo = document.querySelector(".area-to");
	
	function setAreaLeftValue() {
		let _this = areaInputLeft,
	    min = parseInt(_this.min),
	    max = parseInt(_this.max);

	  	_this.value = Math.min(parseInt(_this.value),parseInt(areaInputRight.value) - 5);
	 	areaFrom.textContent = _this.value;
	  	let percent = ((_this.value - min) / (max - min)) * 100;
	  	areaRange.style.left = percent + "%";
	  	
	  	
	}
	setAreaLeftValue();

	function setAreaRightValue() {
		let _this = areaInputRight,
	    min = parseInt(_this.min),
	    max = parseInt(_this.max);

	  	_this.value = Math.max(parseInt(_this.value), parseInt(areaInputLeft.value) + 5);
	  	areaTo.textContent = _this.value;
	  	let percent = ((_this.value - min) / (max - min)) * 100;
	  	areaRange.style.right = 100 - percent + "%";
	}

	setAreaRightValue();

	areaInputLeft.addEventListener("input", setAreaLeftValue);
	areaInputRight.addEventListener("input", setAreaRightValue);
	
	
	$(document).on("change", "#price_input_left", function(){
		searchAptList();
	})
	
	$(document).on("change", "#price_input_right", function(){
		searchAptList();
	})
	
	$(document).on("change", "#area_input_left", function(){
		searchAptList();
	})
	
	$(document).on("change", "#area_input_right", function(){
		searchAptList();
	})
	
	
	function searchAptList(){
		$.get(root + "/interest/search"
			,{
				priceLeft : $("#price_input_left").val(),
						priceRight : $("#price_input_right").val(),
				areaLeft : $("#area_input_left").val(),
	  			areaRight : $("#area_input_right").val()
			}
			,function(data, status){
				$.each(data, function(index, vo) {
					console.log(vo);
				});
			}
			, "json"
		);
	}
	
	</script>

	<section id="index_section">
		<div class="card col-sm-12 mt-1" style="min-height: 850px;">
			<div class="card-body">
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
					

					// 리스트 가져오기 함수
					function getList(data){
						$("#interestlocList").empty();
						$.each(data,function(index,vo){
							let str = `
								<li>
									<div class="card p-2" id="loc"
										value="\${vo.baseaddress_dongCode}">
										<h5 class="card-title">\${vo.sidoName}\${vo.gugunName}
											\${vo.dongName}</h5>
									</div>
									<button type="button" class="btn" id="deleteloc">삭제</button>
								</li>
							`;
							$("#interestlocList").append(str);
						});
					};
					
					// 처음에 관심지역 리스트 가져오기
					$(document).ready(function(){
						$.get(root+"/interest/list",function(data){getList(data);});
					});
					
					// 관심지역 추가하기 (비동기로 업데이트)
					$(document).on("click","#addloc",function(){
						let dongCode = $(this).parents("#parent").children("#dong").val();
						
						$.get(root+"/interest/add/"+dongCode,function(data){getList(data);});
					});

					// 관심지역 삭제하기 (비동기로 업데이트)
					$(document).on("click","#deleteloc",function(){
						let dongCode = $(this).parents("li").children("#loc").attr('value');
						
						$.get(root+"/interest/delete/"+dongCode,function(data){getList(data);});
					});
							
					
					// 아파트목록 가져오기 함수
					function getAptList(dt){
						$("#searchResult").empty();
						$.each(dt,function(index,vo){
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
						displayMarkers(dt);
					};
					
					// 관심지역 바뀔때마다 아파트목록 다시 가져오기
					$(document).ready(function(){
						$.get(root+"/interest/apt",function(data){
							getAptList(data);
						});
					});
					$("#addloc #deleteloc").on("click",function(){
						$.get(root+"/interest/apt",function(data){
							getAptList(data);
						});
					});
					
					
					
					$(document).on("click","#searchResult>tr>td",function(){
						let aptCode = $(this).parents("tr").children("#aptCode").text();
						let aptName = $(this).parents("tr").children("#aptName").text();
						
						
						$.get(root+"/house/"+aptCode,function(list){
							$("#houseDealTitle").html("<strong>"+aptName+"</strong> 매매 정보");
							$("#houseModalBody").empty();
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


	<jsp:include page="user_modal.jsp" />


</body>
</html>