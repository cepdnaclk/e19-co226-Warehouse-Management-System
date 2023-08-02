package com.databaseWHM.Warehouse.Management.System.repository;


import com.databaseWHM.Warehouse.Management.System.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer>{
}
