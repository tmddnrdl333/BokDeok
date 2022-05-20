package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.DongSearchDto;

@Mapper
public interface DongSearchMapper {
	List<DongSearchDto> getDongSearchResult(String keyword) throws SQLException;
}
