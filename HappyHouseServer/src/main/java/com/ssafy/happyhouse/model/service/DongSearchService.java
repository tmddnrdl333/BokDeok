package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.model.DongSearchDto;

public interface DongSearchService {
	List<DongSearchDto> getDongSearchResult(String keyword) throws SQLException;
}
