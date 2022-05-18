package com.ssafy.happyhouse.model.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.happyhouse.model.QnaDto;
import com.ssafy.happyhouse.model.mapper.QnaMapper;

@Service
public class QnaServiceImpl implements QnaService {

	@Autowired
	private QnaMapper qnaMapper;

	@Override
	public QnaDto getQna(int qnaNo) throws SQLException {
		return qnaMapper.getQna(qnaNo);
	}

	@Override
	public List<QnaDto> getQnaListByCondition(Map<String, String> condition) throws SQLException {
		return qnaMapper.getQnaListByCondition(condition);
	}

	@Override
	public boolean writeQna(QnaDto qnaDto) throws SQLException {
		return qnaMapper.writeQna(qnaDto);
	}

	@Override
	public boolean modifyQna(QnaDto qnaDto) throws SQLException {
		return qnaMapper.modifyQna(qnaDto);
	}

	@Override
	public boolean answerQna(QnaDto qnaDto) throws SQLException {
		return qnaMapper.answerQna(qnaDto);
	}

	@Override
	public boolean removeQna(int qnaNo) throws SQLException {
		return qnaMapper.removeQna(qnaNo);
	}

}
