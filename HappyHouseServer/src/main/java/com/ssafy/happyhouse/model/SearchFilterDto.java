package com.ssafy.happyhouse.model;

public class SearchFilterDto {
	private String id;
	private int priceLeft;
	private int priceRight;
	private int areaLeft;
	private int areaRight;

	public SearchFilterDto(String id, int priceLeft, int priceRight, int areaLeft, int areaRight) {
		this.id = id;
		this.priceLeft = priceLeft;
		this.priceRight = priceRight;
		this.areaLeft = areaLeft;
		this.areaRight = areaRight;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

}
