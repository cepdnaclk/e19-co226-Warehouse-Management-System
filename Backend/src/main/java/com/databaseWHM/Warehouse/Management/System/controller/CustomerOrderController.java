package com.databaseWHM.Warehouse.Management.System.controller;

import com.databaseWHM.Warehouse.Management.System.model.CustomerOrder;
import com.databaseWHM.Warehouse.Management.System.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customerorders")
public class CustomerOrderController {

    private final CustomerOrderRepository customerOrderRepository;

    @Autowired
    public CustomerOrderController(CustomerOrderRepository customerOrderRepository) {
        this.customerOrderRepository = customerOrderRepository;
    }

    // Get all customer orders
    @GetMapping
    public List<CustomerOrder> getAllCustomerOrders() {
        return customerOrderRepository.findAll();
    }

    // Get a single customer order by ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerOrder> getCustomerOrderById(@PathVariable Long id) {
        Optional<CustomerOrder> customerOrderOptional = customerOrderRepository.findById(id);
        return customerOrderOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create or Update a customer order
    @PostMapping
    public ResponseEntity<CustomerOrder> createOrUpdateCustomerOrder(@RequestBody CustomerOrder customerOrder) {
        CustomerOrder savedCustomerOrder = customerOrderRepository.save(customerOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCustomerOrder);
    }

    // Update an existing customer order
    @PutMapping("/{id}")
    public ResponseEntity<CustomerOrder> updateCustomerOrder(@PathVariable Long id, @RequestBody CustomerOrder customerOrder) {
        Optional<CustomerOrder> existingCustomerOrderOptional = customerOrderRepository.findById(id);
        if (existingCustomerOrderOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        customerOrder.setOrderID(id);
        CustomerOrder updatedCustomerOrder = customerOrderRepository.save(customerOrder);
        return ResponseEntity.ok(updatedCustomerOrder);
    }

    // Delete a customer order by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerOrder(@PathVariable Long id) {
        Optional<CustomerOrder> existingCustomerOrderOptional = customerOrderRepository.findById(id);
        if (existingCustomerOrderOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        customerOrderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
