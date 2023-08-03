package com.databaseWHM.Warehouse.Management.System.repository;

import com.databaseWHM.Warehouse.Management.System.model.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CustomerOrderRepositoryTest {
    @Autowired
    private CustomerOrderRepository customerOrderRepository;

    @Autowired
    private CustomerRepository customerRepository;
    @Test
    public void saveOrder(){
        Customer customer =Customer.builder().build();
//        customerRepository.save(customer);
    }

}