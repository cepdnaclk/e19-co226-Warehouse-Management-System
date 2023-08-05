package com.databaseWHM.Warehouse.Management.System.repository;


import com.databaseWHM.Warehouse.Management.System.model.Inventory;
import com.databaseWHM.Warehouse.Management.System.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    List<Inventory> findByProduct(Product product);
}
