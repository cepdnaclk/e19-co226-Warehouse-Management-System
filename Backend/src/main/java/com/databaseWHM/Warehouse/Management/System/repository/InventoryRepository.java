package com.databaseWHM.Warehouse.Management.System.repository;


import com.databaseWHM.Warehouse.Management.System.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Long> {
}
