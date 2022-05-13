package com.ssafy.happyhouse.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.HouseInfoDto;
import com.ssafy.happyhouse.model.InterestlocDto;
import com.ssafy.happyhouse.model.SearchFilterDto;

@Mapper
public interface InterestlocMapper {

	void addInterestloc(InterestlocDto interestloc);

	List<InterestlocDto> getInterestloc(String id);

	void deleteInterestloc(InterestlocDto interestloc);
	
	List<HouseInfoDto> getInterestAptList(String id);

	List<HouseInfoDto> searchAptList(SearchFilterDto filter);
}
