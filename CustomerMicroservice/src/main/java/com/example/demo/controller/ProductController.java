package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.MyCart;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.annotation.ObjectIdGenerators.StringIdGenerator;

@RestController
public class ProductController {
	@Autowired
	ProductRepository productrepo;
	@Autowired
	ProductService productservice;

	@RequestMapping("/mycart/{pid}/{cid}")
	public String addToCart(@PathVariable String pid, @PathVariable String cid) {
		String status = productservice.addToCart(pid, cid);
		System.out.println(status);
		return status;
	}

	@RequestMapping("/savecart/{cid}/{pid}/{quantity}")
	public String saveCart(@PathVariable String cid, @PathVariable String pid, @PathVariable String quantity) {
		int q = Integer.parseInt(quantity);
		String status = productservice.saveCart(cid, pid, q);
		System.out.println(status);
		return status;
	}

	@RequestMapping("/checkout/{status}/{cid}")
	public String orderProduct(@PathVariable String cid, @PathVariable String status) {
		if (status.equals("success")) {
			return productservice.orderProduct(cid);
		} else {
			return null;
		}

	}

	@GetMapping("/viewcart/{cid}")
	public List<MyCart> viewcart(@PathVariable String cid) {
		return productservice.viewcart(cid);
	}

	@GetMapping("/showproductbyid/{pid}")
	public List<Product> findByProducid(@PathVariable String pid) {
		return productservice.findByProdoctid(pid);
	}
}
