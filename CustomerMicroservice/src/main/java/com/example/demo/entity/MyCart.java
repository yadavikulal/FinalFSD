package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="mycart")
public class MyCart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String customerid;
	private String productid;
	private int quantity;
	public MyCart(String customerid, String productid, int quantity) {
		super();
		this.customerid = customerid;
		this.productid = productid;
		this.quantity=quantity;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public MyCart() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCustomerid() {
		return customerid;
	}
	public void setCustomerid(String customerid) {
		this.customerid = customerid;
	}
	public String getProductid() {
		return productid;
	}
	public void setProductid(String productid) {
		this.productid = productid;
	}
	
	
}
