package com.ssafy.happyhouse.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.InterestlocDto;
import com.ssafy.happyhouse.model.FilterDto;
import com.ssafy.happyhouse.model.mapper.InterestlocMapper;

@Service
public class InterestlocServiceImpl implements InterestlocService {
	
	@Autowired
	private InterestlocMapper interestlocMapper;
	
	@Override
	public void addInterestloc(InterestlocDto interestloc) {
		interestlocMapper.addInterestloc(interestloc);
	}
	
	
	@Override
	public List<InterestlocDto> getInterestloc(String id) {
		return interestlocMapper.getInterestloc(id);
	}


	@Override
	public void deleteInterestloc(InterestlocDto interestloc) {
		interestlocMapper.deleteInterestloc(interestloc);
	}


	@Override
	public List<HouseInfoDto> getInterestAptList(String id) {
		return interestlocMapper.getInterestAptList(id);
	}


	@Override
	public List<HouseInfoDto> searchApt(FilterDto filter) {
		return interestlocMapper.searchAptList(filter);
	}
	
}
