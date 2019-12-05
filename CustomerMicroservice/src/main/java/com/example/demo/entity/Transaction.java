package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String transactionid;
	private String customerid;
	private String productid;
	private String transactionamount;
	public Transaction(String transactionid, String customerid, String productid, String transactionamount) {
		super();
		this.transactionid = transactionid;
		this.customerid = customerid;
		this.productid = productid;
		this.transactionamount = transactionamount;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTransactionid() {
		return transactionid;
	}
	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
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
	public String getTransactionamount() {
		return transactionamount;
	}
	public void setTransactionamount(String transactionamount) {
		this.transactionamount = transactionamount;
	}
	
	
}
