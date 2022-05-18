package com.ssafy.happyhouse.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.MemberService;

@RestController
@RequestMapping("/user")
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

	@Autowired
	private MemberService memberService;

	@GetMapping
	public ResponseEntity<List<MemberDto>> getMembers() {
//		logger.debug(session.getAttribute("memberInfo").toString());
		List<MemberDto> list = memberService.listMember();
		if (list.size() > 0) {
			return new ResponseEntity<List<MemberDto>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<MemberDto>>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/idCheck")
	public ResponseEntity<Integer> idCheck(@RequestBody String id) {
		int idCount = memberService.idCheck(id);
//		if(idCount == 0)
//			return ResponseEntity.noContent().build();
		return new ResponseEntity<Integer>(idCount, HttpStatus.OK);
	}

	@PostMapping("/regist")
	public ResponseEntity regist(@RequestBody MemberDto member) {
		memberService.registMember(member);
		return ResponseEntity.created(URI.create("/user/" + member.getId())).build();
	}

	@PostMapping("/login")
	public ResponseEntity<MemberDto> login(@RequestBody Map<String, String> map, HttpSession session) {
		MemberDto member = memberService.login(map);
		if (member != null) {
			session.setAttribute("userId", member.getId());
			session.setAttribute("userName", member.getName());
			System.out.println("로그인 헀엉");
			return ResponseEntity.ok(member);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/logout")
	public ResponseEntity logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/info")
	public ResponseEntity<MemberDto> memberDetail(HttpSession session) {
		String id = (String) session.getAttribute("userId");
		MemberDto member = memberService.getMember(id);
		if (member != null) {
			return ResponseEntity.ok(member);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/remove")
	public ResponseEntity removeMember(HttpSession session) {
		String id = (String) session.getAttribute("userId");
		MemberDto member = memberService.getMember(id);
		if (member != null) {
			session.invalidate();
			memberService.deleteMember(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/modify")
	public ResponseEntity modifyMember(@RequestBody MemberDto updateMember, HttpSession session) {
		String id = (String) session.getAttribute("userId");
		MemberDto member = memberService.getMember(id);
		if (member != null) {
			memberService.updateMember(updateMember);
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}

}
