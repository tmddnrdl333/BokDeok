package com.ssafy.happyhouse.model.mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.happyhouse.model.NoticeDto;
import com.ssafy.happyhouse.model.QnaDto;

@Mapper
public interface QnaMapper {

	QnaDto getQna(int qnaNo) throws SQLException;

	List<QnaDto> getQnaListByCondition(Map<String, String> condition) throws SQLException;

	boolean writeQna(QnaDto qnaDto) throws SQLException;

	boolean modifyQna(QnaDto qnaDto) throws SQLException;

	boolean removeQna(int qnaNo) throws SQLException;
}
