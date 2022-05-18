package com.ssafy.happyhouse.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.InterestlocDto;
import com.ssafy.happyhouse.model.MemberDto;
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
		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		List<InterestlocDto> list = interestlocService.getInterestloc(member.getId());
//		model.addAttribute("interestlocList", list);
		if (list != null) {
			return new ResponseEntity<List<InterestlocDto>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<InterestlocDto>>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/apt")
	public ResponseEntity<List<HouseInfoDto>> interestAptList(HttpSession session) {
		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		List<HouseInfoDto> hList = interestlocService.getInterestAptList(member.getId());
		return new ResponseEntity<List<HouseInfoDto>>(hList, HttpStatus.OK);
	}

//	@GetMapping("/list")
//	public ResponseEntity<List<InterestlocDto>> getInterestlocList(HttpSession session) {
//		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
//		return new ResponseEntity<List<InterestlocDto>>(interestlocService.getInterestloc(member.getId()), HttpStatus.OK);
//	}

	@GetMapping("/search")
	public ResponseEntity<List<HouseInfoDto>> aptSearchResult(HttpSession session,
			@RequestParam(value = "priceLeft") int priceLeft, @RequestParam(value = "priceRight") int priceRight,
			@RequestParam(value = "areaLeft") int areaLeft, @RequestParam(value = "areaRight") int areaRight) {
		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		SearchFilterDto filter = new SearchFilterDto(member.getId(), priceLeft, priceRight, areaLeft, areaRight);
		return new ResponseEntity<List<HouseInfoDto>>(interestlocService.searchApt(filter), HttpStatus.OK);
	}

	@GetMapping("/add/{dongCode}")
	public ResponseEntity<List<InterestlocDto>> addInterestloc(@PathVariable String dongCode, HttpSession session) {
		InterestlocDto interestloc = new InterestlocDto();
		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		interestloc.setMember_id(member.getId());
		interestloc.setBaseaddress_dongCode(dongCode);
		interestlocService.addInterestloc(interestloc);
		List<InterestlocDto> list = interestlocService.getInterestloc(member.getId());
		return new ResponseEntity<List<InterestlocDto>>(list, HttpStatus.OK);
	}

	@GetMapping("/delete/{dongCode}")
	public ResponseEntity<List<InterestlocDto>> deleteInterestloc(@PathVariable String dongCode, HttpSession session) {
		InterestlocDto interestloc = new InterestlocDto();
		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		interestloc.setMember_id(member.getId());
		interestloc.setBaseaddress_dongCode(dongCode);
		interestlocService.deleteInterestloc(interestloc);
		List<InterestlocDto> list = interestlocService.getInterestloc(member.getId());
		if (list != null) {
			return new ResponseEntity<List<InterestlocDto>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<InterestlocDto>>(HttpStatus.NO_CONTENT);
	}

}
