package com.databaseWHM.Warehouse.Management.System.repository;
import com.databaseWHM.Warehouse.Management.System.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
}
