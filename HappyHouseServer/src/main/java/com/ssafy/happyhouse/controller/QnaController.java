package com.ssafy.happyhouse.controller;

import java.net.URI;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.QnaDto;
import com.ssafy.happyhouse.model.service.QnaService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/qna")
public class QnaController {

	private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

	@Autowired
	private QnaService qnaService;

	@GetMapping
	public ResponseEntity<List<QnaDto>> qnaListByCondition(@RequestParam(required = false) String userName,
			@RequestParam(required = false) String subject) throws SQLException {

		HashMap<String, String> condition = new HashMap<String, String>();
		if (userName != null)
			condition.put("userName", userName);
		if (subject != null)
			condition.put("subject", subject);

		List<QnaDto> list = qnaService.getQnaListByCondition(condition);
		return new ResponseEntity<List<QnaDto>>(list, HttpStatus.OK);
	}

	@PostMapping("/auth/regist")
	public ResponseEntity writeQna(@RequestBody QnaDto qnaDto) throws SQLException {
		qnaService.writeQna(qnaDto);
		return ResponseEntity.created(URI.create("/qna/" + qnaDto.getQnaNo())).build();
	}

	@GetMapping("/{qnaNo}")
	public ResponseEntity<QnaDto> qnaDetail(@PathVariable int qnaNo) throws SQLException {
		QnaDto qnaDto = qnaService.getQna(qnaNo);
		if (qnaDto != null)
			return ResponseEntity.ok(qnaDto);
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/auth/remove/{qnaNo}")
	public ResponseEntity removeQna(@PathVariable int qnaNo) throws SQLException {
		qnaService.removeQna(qnaNo);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/auth/modify/{qnaNo}")
	public ResponseEntity modifyQna(@PathVariable int qnaNo, @RequestBody QnaDto qnaDto) throws SQLException {
		qnaService.modifyQna(qnaDto);
		return ResponseEntity.noContent().build();
	}

}
