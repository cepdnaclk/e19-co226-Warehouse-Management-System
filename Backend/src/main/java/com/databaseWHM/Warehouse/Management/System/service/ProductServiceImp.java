package com.databaseWHM.Warehouse.Management.System.service;

import com.databaseWHM.Warehouse.Management.System.model.Product;
import com.databaseWHM.Warehouse.Management.System.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }


}
