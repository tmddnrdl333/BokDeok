package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.ssafy.happyhouse.model.QnaDto;

public interface QnaService {
	QnaDto getQna(int qnaNo) throws SQLException;

	List<QnaDto> getQnaListByCondition(Map<String, String> condition) throws SQLException;

	boolean writeQna(QnaDto qnaDto) throws SQLException;

	boolean modifyQna(QnaDto qnaDto) throws SQLException;

	boolean removeQna(int qnaNo) throws SQLException;

}
