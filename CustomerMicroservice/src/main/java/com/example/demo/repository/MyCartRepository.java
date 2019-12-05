package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.MyCart;

@Repository
public interface MyCartRepository extends JpaRepository<MyCart, String>{

	List<MyCart> findByCustomerid(String cid);
	void deleteByCustomerid(String cid);
	List<MyCart> findByCustomeridAndProductid(String cid, String pid);
	List<MyCart> findAllByCustomerid(String cid);
}
