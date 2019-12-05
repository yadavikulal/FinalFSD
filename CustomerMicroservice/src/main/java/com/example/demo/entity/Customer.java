package com.example.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="customer")
public class Customer  {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String customerid;
	private String customername;
	private String customeremail;
	private String customerpassword;
	private String customercontact;
	private String customergender;
	private String customeraddress;
	private int customerwallet;
	

	public Customer() {
		super();
	}


	public Customer(String customerid, String customername, String customeremail, String customerpassword,
			String customercontact, String customergender, String customeraddress, int customerwallet) {
		super();
		this.customerid = customerid;
		this.customername = customername;
		this.customeremail = customeremail;
		this.customerpassword = customerpassword;
		this.customercontact = customercontact;
		this.customergender = customergender;
		this.customeraddress = customeraddress;
		this.customerwallet = customerwallet;
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


	public String getCustomername() {
		return customername;
	}


	public void setCustomername(String customername) {
		this.customername = customername;
	}


	public String getCustomeremail() {
		return customeremail;
	}


	public void setCustomeremail(String customeremail) {
		this.customeremail = customeremail;
	}


	public String getCustomerpassword() {
		return customerpassword;
	}


	public void setCustomerpassword(String customerpassword) {
		this.customerpassword = customerpassword;
	}


	public String getCustomercontact() {
		return customercontact;
	}


	public void setCustomercontact(String customercontact) {
		this.customercontact = customercontact;
	}


	public String getCustomergender() {
		return customergender;
	}


	public void setCustomergender(String customergender) {
		this.customergender = customergender;
	}


	public String getCustomeraddress() {
		return customeraddress;
	}


	public void setCustomeraddress(String customeraddress) {
		this.customeraddress = customeraddress;
	}


	public int getCustomerwallet() {
		return customerwallet;
	}


	public void setCustomerwallet(int customerwallet) {
		this.customerwallet = customerwallet;
	}
	
	

}
	
	
	