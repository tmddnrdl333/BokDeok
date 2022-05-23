package com.ssafy.happyhouse.model.service;

import java.util.List;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.InterestlocDto;
import com.ssafy.happyhouse.model.FilterDto;

public interface InterestlocService {

	void addInterestloc(InterestlocDto interestloc);

	List<InterestlocDto> getInterestloc(String id);

	void deleteInterestloc(InterestlocDto interestloc);

	List<HouseInfoDto> getInterestAptList(String id);

	List<HouseInfoDto> searchApt(FilterDto filter);

}