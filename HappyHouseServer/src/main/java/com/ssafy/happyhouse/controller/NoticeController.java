package com.ssafy.happyhouse.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ssafy.happyhouse.model.NoticeDto;
import com.ssafy.happyhouse.model.service.NoticeService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@Controller
@RequestMapping("/notice")
public class NoticeController {

	private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

	@Autowired
	private NoticeService noticeService;

	@GetMapping
	public String noticeListByCondition(@RequestParam(required = false) String userName,
			@RequestParam(required = false) String subject, Model model) throws SQLException {

		HashMap<String, String> condition = new HashMap<String, String>();
		if (userName != null)
			condition.put("userName", userName);
		if (subject != null)
			condition.put("subject", subject);

		List<NoticeDto> list = noticeService.getNoticeListByCondition(condition);
		model.addAttribute("list", list);
		model.addAttribute("condition", condition);
		return "/notice";
	}

	@PostMapping("/auth/regist")
	public String writeNotice(@RequestBody NoticeDto noticeDto) throws SQLException {
		noticeService.writeNotice(noticeDto);
		return "redirect:/notice";
	}

	@GetMapping("/article/{noticeNo}")
	@ResponseBody
	public ResponseEntity<NoticeDto> noticeDetail(@PathVariable int noticeNo) throws SQLException {
		NoticeDto noticeDto = noticeService.getNotice(noticeNo);
		if (noticeDto != null)
			return ResponseEntity.ok(noticeDto);
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/auth/remove/{noticeNo}")
	public String removeNotice(@PathVariable int noticeNo) throws SQLException {
		noticeService.removeNotice(noticeNo);
		return "redirect:/notice";
	}

	@PostMapping("/auth/modify/{noticeNo}")
	public String modifyNotice(@PathVariable int noticeNo, @RequestBody NoticeDto noticeDto) throws SQLException {
		System.out.println(noticeDto.getContent());
		noticeService.modifyNotice(noticeDto);
		return "redirect:/notice";
	}

}
