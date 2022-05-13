<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- login Modal -->
<div class="modal" id="loginModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<h4 class="modal-title">로그인</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<!-- Modal body -->
			<div class="modal-body">
				<form action="${root}/user/login" method="post"
					enctype="multipart/form-data">
					<!-- <form id="loginForm"> -->
					<div class="form-group">
						<label for="id">ID:</label> <input type="text"
							class="form-control" placeholder="Enter id" name="id" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Password:</label> <input type="password"
							class="form-control" placeholder="Enter password" name="pw" />
					</div>
					<div class="form-group form-check">
						<label class="form-check-label pt-2"> <input
							class="form-check-input" type="checkbox" /> Remember me
						</label>
					</div>
					<button type="submit" class="btn btn-primary" id="submitLogin">로그인</button>
				</form>
			</div>

			<!-- Modal footer -->
			<div class="modal-footer">
				<a href="#" class="btn btn-outline-danger">비밀번호 찾기</a>
			</div>
		</div>
	</div>
</div>
<!-- login Modal end -->

<!-- regist Modal -->
<div class="modal" id="registModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<h4 class="modal-title">회원가입</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<!-- Modal body -->
			<div class="modal-body">
				<form action="${root}/user/regist" method="post">
					<!-- <form id="loginForm"> -->
					<div class="form-group">
						<label for="id">ID:</label> <input type="text"
							class="form-control" placeholder="Enter id" name="id"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Password:</label> <input type="password"
							class="form-control" placeholder="Enter password" name="pw"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Name:</label> <input type="text"
							class="form-control" placeholder="Enter name" name="name"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Email:</label> <input type="text"
							class="form-control" placeholder="Enter email" name="email"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Phone:</label> <input type="text"
							class="form-control" placeholder="Enter phone number"
							name="phone" required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Address:</label> <input type="text"
							class="form-control" placeholder="Enter address" name="address" />
					</div>
					<button type="submit" class="btn btn-primary">회원가입</button>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- regist Modal end -->


<!-- info Modal -->
<div class="modal" id="infoModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<h4 class="modal-title">회원 정보</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<!-- Modal body -->
			<div class="modal-body">
				<form action="${root}/user/${memberInfo.id}" method="post">
					<!-- <form id="loginForm"> -->
					<div class="form-group">
						<label for="id">ID:</label> <input type="text"
							class="form-control" name="id"
							required="required" readonly="readonly" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Password:</label> <input type="password"
							class="form-control" placeholder="Enter password" name="pw"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Name:</label> <input type="text"
							class="form-control" placeholder="Enter name" name="name"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Email:</label> <input type="text"
							class="form-control" placeholder="Enter email" name="email"
							required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Phone:</label> <input type="text"
							class="form-control" placeholder="Enter phone number"
							name="phone" required="required" />
					</div>
					<div class="form-group pt-2">
						<label for="pw">Address:</label> <input type="text"
							class="form-control" placeholder="Enter address" name="address" />
					</div>
					<button type="submit" class="btn btn-primary">수정하기</button><br>
					<button type="button" class="btn btn-link btn-sm text-danger align-self-end" id="withdraw">탈퇴하기</button>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- info Modal end -->


<script type="text/javascript">
$(document).on("click","#memberInfo",function(){
	$.get(root+"/user/${memberInfo.id}",function(data, status){
		$("#infoModal [name='id']").val(data.id);
		$("#infoModal [name='pw']").val(data.pw);
		$("#infoModal [name='name']").val(data.name);
		$("#infoModal [name='email']").val(data.email);
		$("#infoModal [name='phone']").val(data.phone);
		$("#infoModal [name='address']").val(data.address);
		$("#infoModal").modal();
	});
});
$(document).on("click", "#withdraw", function(){
	var res = confirm("정말로 탈퇴하시겠습니까?");
	if(res == true){
		$.get(root+"/user/delete/${memberInfo.id}");
		
	} else if(res == false){
		return;
	}
})
</script>