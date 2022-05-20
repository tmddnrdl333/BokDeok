package com.ssafy.happyhouse.model;

public class DongSearchDto {
	private String dongCode;
	private String fullName;

	public DongSearchDto(String dongCode, String fullName) {
		super();
		this.dongCode = dongCode;
		this.fullName = fullName;
	}

	public String getDongCode() {
		return dongCode;
	}

	public void setDongCode(String dongCode) {
		this.dongCode = dongCode;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@Override
	public String toString() {
		return "DongSearchDto [dongCode=" + dongCode + ", fullName=" + fullName + "]";
	}

}
