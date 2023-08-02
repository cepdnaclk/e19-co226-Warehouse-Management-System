package com.databaseWHM.Warehouse.Management.System.controller;

import com.databaseWHM.Warehouse.Management.System.model.Customer;
import com.databaseWHM.Warehouse.Management.System.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @PostMapping("/add")
    public String add(@RequestBody Customer customer){
        customerService.saveCustomer(customer);
        return "New Customer is Added";
    }

}
