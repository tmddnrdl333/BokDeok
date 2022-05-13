package com.ssafy.happyhouse.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ssafy.happyhouse.model.MemberDto;
import com.ssafy.happyhouse.model.service.MemberService;


@Controller
@RequestMapping("/user")
public class MemberController {

	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

	@Autowired
	private MemberService memberService;
	
	@ResponseBody
	@GetMapping
	public ResponseEntity<List<MemberDto>> getMembers(HttpSession session){
		logger.debug(session.getAttribute("memberInfo").toString());
		List<MemberDto> list = memberService.listMember();
		if(list.size() > 0) {
			return new ResponseEntity<List<MemberDto>>(list, HttpStatus.OK);
		}
		return new ResponseEntity<List<MemberDto>>(HttpStatus.NO_CONTENT);
	}
	
	@ResponseBody
	@GetMapping("/idCheck")
	public ResponseEntity<Integer> idCheck(@RequestBody String id) {
		int idCount = memberService.idCheck(id);
//		if(idCount == 0)
//			return ResponseEntity.noContent().build();
		return new ResponseEntity<Integer>(idCount, HttpStatus.OK);
	}
	
	
	@PostMapping("/regist")
	public String regist( MemberDto member) {
		memberService.registMember(member);
//		return ResponseEntity.created(URI.create("/user/" + member.getId())).build();
		return "redirect:/";
	}

	@PostMapping("/login")
	public String login(@RequestParam Map<String, String> map, RedirectAttributes rttr, HttpSession session) {
		MemberDto member = memberService.login(map);
		System.out.println(member);
		if(member != null) {
			session.setAttribute("memberInfo", member);
			
		} else {
			rttr.addFlashAttribute("msg", "아이디 또는 비밀번호 확인 후 다시 로그인하세요!");
		}
		return "redirect:/";
		
		
	}
	
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}
	
	@ResponseBody
	@GetMapping("/{id}")
	public ResponseEntity<MemberDto> memberDetail(@PathVariable String id){
//		MemberDto member = (MemberDto) session.getAttribute("memberInfo");
		MemberDto member = memberService.getMember(id);
		if(member != null) {
			return ResponseEntity.ok(member);
		}
		return ResponseEntity.notFound().build();
	}
	
//	@DeleteMapping("/{id}")
	@GetMapping("delete/{id}")
	public String removeMember(@PathVariable String id, HttpSession session, RedirectAttributes rttr) {
		if(memberService.getMember(id) != null) {
			memberService.deleteMember(id);
			session.invalidate();
		} else {
			rttr.addFlashAttribute("msg", "다시 로그인하세요!");
		}
		return "redirect:/";
	}
	
//	@PutMapping("/{id}")
	@PostMapping("/{id}")
	public String modifyMember(@PathVariable String id, MemberDto member, RedirectAttributes rttr) {
		if(memberService.getMember(id) != null) {
			memberService.updateMember(member);
		} else {
			rttr.addFlashAttribute("msg", "다시 로그인하세요!");
		}
		return "redirect:/";
	}
	
	
	
	
	
}
