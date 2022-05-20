package com.ssafy.happyhouse.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.DongSearchDto;
import com.ssafy.happyhouse.model.service.DongSearchService;

@RestController
@RequestMapping("/dongsearch")
public class DongSearchController {

	private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

	@Autowired
	private DongSearchService dongSearchService;

	@GetMapping
	public ResponseEntity<List<DongSearchDto>> houseDealList(@RequestParam("keyword") String keyword) throws Exception {
		System.out.println(keyword);
		List<DongSearchDto> list = dongSearchService.getDongSearchResult(keyword);
		return new ResponseEntity<List<DongSearchDto>>(list, HttpStatus.OK);
	}

}
