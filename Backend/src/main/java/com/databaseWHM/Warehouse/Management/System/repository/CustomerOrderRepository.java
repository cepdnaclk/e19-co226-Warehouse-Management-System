package com.databaseWHM.Warehouse.Management.System.repository;

import com.databaseWHM.Warehouse.Management.System.model.CustomerOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder,Long> {
}
