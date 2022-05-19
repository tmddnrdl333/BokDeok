package com.ssafy.happyhouse.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.JwtServiceImpl;
import com.ssafy.happyhouse.model.service.MemberService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class MemberController {

	public static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private JwtServiceImpl jwtService;

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
	public ResponseEntity<Map<String, Object>> regist(@RequestBody MemberDto member) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			memberService.registMember(member);
			logger.debug("회원가입 성공!");
			resultMap.put("message", SUCCESS);
			status = HttpStatus.ACCEPTED;
		}catch(Exception e) {
			logger.error("회원가입 실패~");
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> idpw) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;
		try {
			MemberDto loginUser = memberService.login(idpw);
			if (loginUser != null) {
				String token = jwtService.create("userid", loginUser.getId(), "access-token");// key, data, subject
				logger.debug("로그인 토큰정보 : {}", token);
				resultMap.put("access-token", token);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
				System.out.println("로그인 했엉");
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@GetMapping("/logout")
	public ResponseEntity logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.noContent().build();
	}

//	@GetMapping("/info")
//	public ResponseEntity<MemberDto> memberDetail(HttpSession session) {
//		String id = (String) session.getAttribute("userId");
//		MemberDto member = memberService.getMember(id);
//		if (member != null) {
//			return ResponseEntity.ok(member);
//		}
//		return ResponseEntity.notFound().build();
//	}
	
	
	@GetMapping("/info/{userid}")
	public ResponseEntity<Map<String, Object>> getInfo(
			@PathVariable("userid") String userid,
			HttpServletRequest request) {
//		logger.debug("userid : {} ", userid);
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		if (jwtService.isUsable(request.getHeader("access-token"))) {
			logger.info("사용 가능한 토큰!!!");
			try {
//				로그인 사용자 정보.
				MemberDto memberDto = memberService.getMember(userid);
				resultMap.put("userInfo", memberDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.ACCEPTED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
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
