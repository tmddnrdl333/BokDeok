package com.ssafy.happyhouse.controller;

import java.net.URI;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.NoticeDto;
import com.ssafy.happyhouse.model.service.NoticeService;

@RestController
@RequestMapping("/notice")
public class NoticeController {

	private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

	@Autowired
	private NoticeService noticeService;

	@GetMapping
	public ResponseEntity<List<NoticeDto>> noticeListByCondition(@RequestParam(required = false) String userName,
			@RequestParam(required = false) String subject) throws SQLException {

		HashMap<String, String> condition = new HashMap<String, String>();
		if (userName != null)
			condition.put("userName", userName);
		if (subject != null)
			condition.put("subject", subject);

		List<NoticeDto> list = noticeService.getNoticeListByCondition(condition);
		return new ResponseEntity<List<NoticeDto>>(list, HttpStatus.OK);
	}

	@GetMapping("/{noticeNo}")
	public ResponseEntity<NoticeDto> noticeDetail(@PathVariable int noticeNo) throws SQLException {
		NoticeDto noticeDto = noticeService.getNotice(noticeNo);
		if (noticeDto != null)
			return ResponseEntity.ok(noticeDto);
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/auth")
	public ResponseEntity writeNotice(@RequestBody NoticeDto noticeDto, HttpSession session) throws SQLException {
		noticeDto.setUserId((String) session.getAttribute("userId"));
		noticeDto.setUserName((String) session.getAttribute("userName"));
		noticeService.writeNotice(noticeDto);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping("/auth/{noticeNo}")
	public ResponseEntity removeNotice(@PathVariable int noticeNo, HttpSession session) throws SQLException {
		String remover = (String) session.getAttribute("userId"); // 삭제하려는 사람
		if (remover.equals("admin")) { // 관리자만 삭제 가능
			noticeService.removeNotice(noticeNo);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/auth/{noticeNo}")
	public ResponseEntity modifyNotice(@PathVariable int noticeNo, @RequestBody NoticeDto noticeDto,
			HttpSession session) throws SQLException {
		String modifier = (String) session.getAttribute("userId"); // 수정하려는 사람
		if (modifier.equals("admin")) { // 관리자만 수정 가능
			noticeDto.setNoticeNo(noticeNo);
			noticeService.modifyNotice(noticeDto);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}
}
