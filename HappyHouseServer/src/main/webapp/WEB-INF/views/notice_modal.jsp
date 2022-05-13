<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- noticeRegistModal -->
<div class="modal" id="noticeRegistModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<h4 class="modal-title">공지사항 등록</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<form action="${root}/notice/auth/regist" method="post">
				<!-- Modal body -->
				<div class="modal-body">
					<div class="form-group">
						<label for="subject">제목 :</label> <input type="text"
							class="form-control" placeholder="제목을 입력하시오" name="subject" />
					</div>
					<div class="form-group pt-2">
						<textarea rows="8" class="form-control" placeholder="본문"
							name="content"></textarea>
					</div>
					<input type="hidden" name="userId" value="${memberId}">
					<input type="hidden" name="userName" value="${memberName}">
				</div>

				<!-- Modal footer -->
				<div class="modal-footer text-right">
					<button type="submit" class="btn btn-primary" id="registNotice">등록</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- noticeRegistModal end -->

<!-- noticeViewModal-->
<div class="modal" id="noticeViewModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
				<h4 class="modal-title">공지사항</h4>
				<button type="button" class="close" data-dismiss="modal">&times;</button>
			</div>

			<form method="POST" id="viewModalForm">
				<input type="hidden" name="_method" value="PUT"/>
				<!-- Modal body -->
				<div class="modal-body">
					<div class="form-group">
						<label for="subject">제목 :</label> <input type="text"
							class="form-control" placeholder="제목을 입력하시오" name="subject" id="subject" />
					</div>
					<div class="form-group pt-2">
						<textarea rows="8" class="form-control" placeholder="본문"
							name="content" id="content"></textarea>
					</div>
					<input type="hidden" id="noticeNo">					
				</div>

				<!-- Modal footer -->
				<div class="modal-footer text-right" id="mnr">
					<input type="submit" class="btn btn-warning" id="modifyNotice" value="수정"/>
					<input type="submit" class="btn btn-danger" id="removeNotice" value="삭제" />
				</div>
			</form>
		</div>
	</div>
</div>
<!-- noticeViewModal end -->

</script>