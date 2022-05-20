package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.DongSearchDto;
import com.ssafy.happyhouse.model.mapper.DongSearchMapper;

@Service
public class DongSearchServiceImpl implements DongSearchService {

	@Autowired
	private DongSearchMapper dongSearchMapper;

	@Override
	public List<DongSearchDto> getDongSearchResult(String keyword) throws SQLException {
		System.out.println(keyword);
		return dongSearchMapper.getDongSearchResult(keyword);
	}
}
