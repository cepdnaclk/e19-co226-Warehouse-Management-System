package com.databaseWHM.Warehouse.Management.System.service;

import com.databaseWHM.Warehouse.Management.System.model.Customer;
import com.databaseWHM.Warehouse.Management.System.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImp implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
}
