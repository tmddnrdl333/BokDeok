package com.ssafy.happyhouse.controller;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.InterestlocDto;
import com.ssafy.happyhouse.model.SearchFilterDto;
import com.ssafy.happyhouse.model.service.InterestlocService;

@RestController
@RequestMapping("/interest")
public class InterestlocController {

	private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

	@Autowired
	private InterestlocService interestlocService;

	@GetMapping("/list")
	public ResponseEntity<List<InterestlocDto>> interestlocList(HttpSession session) {
		List<InterestlocDto> list = interestlocService.getInterestloc((String) session.getAttribute("userId"));
//		model.addAttribute("interestlocList", list);
		if (list != null) {
			return new ResponseEntity<List<InterestlocDto>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<InterestlocDto>>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/apt")
	public ResponseEntity<List<HouseInfoDto>> interestAptList(HttpSession session) {
		List<HouseInfoDto> hList = interestlocService.getInterestAptList((String) session.getAttribute("userId"));
		return new ResponseEntity<List<HouseInfoDto>>(hList, HttpStatus.OK);
	}

//	// 아직은 안건드리는 걸로
//	@GetMapping("/search")
//	public ResponseEntity<List<HouseInfoDto>> aptSearchResult(HttpSession session,
//			@RequestParam(value = "priceLeft") int priceLeft, @RequestParam(value = "priceRight") int priceRight,
//			@RequestParam(value = "areaLeft") int areaLeft, @RequestParam(value = "areaRight") int areaRight) {
//		SearchFilterDto filter = new SearchFilterDto((String) session.getAttribute("userId"), priceLeft, priceRight,
//				areaLeft, areaRight);
//		return new ResponseEntity<List<HouseInfoDto>>(interestlocService.searchApt(filter), HttpStatus.OK);
//	}

	@PostMapping("/{dongCode}")
	public ResponseEntity<List<InterestlocDto>> addInterestloc(@PathVariable String dongCode, HttpSession session) {
		InterestlocDto interestloc = new InterestlocDto();
		String userId = (String) session.getAttribute("userId");
		interestloc.setMember_id(userId);
		interestloc.setBaseaddress_dongCode(dongCode);
		interestlocService.addInterestloc(interestloc);
		List<InterestlocDto> list = interestlocService.getInterestloc(userId);
		return new ResponseEntity<List<InterestlocDto>>(list, HttpStatus.OK);
	}

	@DeleteMapping("/{dongCode}")
	public ResponseEntity<List<InterestlocDto>> deleteInterestloc(@PathVariable String dongCode, HttpSession session) {
		InterestlocDto interestloc = new InterestlocDto();
		String userId = (String) session.getAttribute("userId");
		interestloc.setMember_id(userId);
		interestloc.setBaseaddress_dongCode(dongCode);
		interestlocService.deleteInterestloc(interestloc);
		List<InterestlocDto> list = interestlocService.getInterestloc(userId);
		if (list != null) {
			return new ResponseEntity<List<InterestlocDto>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<InterestlocDto>>(HttpStatus.NO_CONTENT);
	}

}
