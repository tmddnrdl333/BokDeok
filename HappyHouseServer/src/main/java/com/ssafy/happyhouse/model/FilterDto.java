package com.ssafy.happyhouse.model;

public class FilterDto {
	private String dongCode;
	private int priceLeft;
	private int priceRight;
	private int areaLeft;
	private int areaRight;

	public FilterDto(String dongCode, int priceLeft, int priceRight, int areaLeft, int areaRight) {
		this.dongCode = dongCode;
		this.priceLeft = priceLeft;
		this.priceRight = priceRight;
		this.areaLeft = areaLeft;
		this.areaRight = areaRight;
	}

	public String getdongCode() {
		return dongCode;
	}

	public void setdongCode(String dongCode) {
		this.dongCode = dongCode;
	}

	public int getPriceLeft() {
		return priceLeft;
	}

	public void setPriceLeft(int priceLeft) {
		this.priceLeft = priceLeft;
	}

	public int getPriceRight() {
		return priceRight;
	}

	public void setPriceRight(int priceRight) {
		this.priceRight = priceRight;
	}

	public int getAreaLeft() {
		return areaLeft;
	}

	public void setAreaLeft(int areaLeft) {
		this.areaLeft = areaLeft;
	}

	public int getAreaRight() {
		return areaRight;
	}

	public void setAreaRight(int areaRight) {
		this.areaRight = areaRight;
	}

	@Override
	public String toString() {
		return "FilterDto [dongCode=" + dongCode + ", priceLeft=" + priceLeft + ", priceRight=" + priceRight
				+ ", areaLeft=" + areaLeft + ", areaRight=" + areaRight + "]";
	}

}
