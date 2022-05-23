package com.ssafy.happyhouse.model.service;

import java.math.BigInteger;
import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.model.HouseDealDto;

public interface HouseService {
	List<HouseDealDto> getHouseDealInAptNo(BigInteger aptNo) throws SQLException;
}
