package com.ssafy.happyhouse.model.mapper;

import java.math.BigInteger;
import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.HouseDealDto;

@Mapper
public interface HouseMapper {
	List<HouseDealDto> getHouseDealInAptNo(BigInteger aptNo) throws SQLException;
}
