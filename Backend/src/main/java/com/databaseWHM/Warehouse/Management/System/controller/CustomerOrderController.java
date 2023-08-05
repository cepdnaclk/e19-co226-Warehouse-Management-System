package com.databaseWHM.Warehouse.Management.System.controller;

import com.databaseWHM.Warehouse.Management.System.model.CustomerOrder;
import com.databaseWHM.Warehouse.Management.System.model.OrderItem;
import com.databaseWHM.Warehouse.Management.System.model.Product;
import com.databaseWHM.Warehouse.Management.System.repository.CustomerOrderRepository;
import com.databaseWHM.Warehouse.Management.System.repository.InventoryRepository;
import com.databaseWHM.Warehouse.Management.System.repository.ProductRepository;
import com.databaseWHM.Warehouse.Management.System.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class CustomerOrderController {

    private final CustomerOrderRepository customerOrderRepository;
    private final ProductRepository productRepository;
    private final InventoryService inventoryService;

    @Autowired
    public CustomerOrderController(CustomerOrderRepository customerOrderRepository, ProductRepository productRepository, InventoryRepository inventoryRepository, InventoryService inventoryService) {
        this.customerOrderRepository = customerOrderRepository;
        this.productRepository = productRepository;
        this.inventoryService = inventoryService;
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
        customerOrder.setOrderDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        // Check inventory before accepting the order
        for (OrderItem orderItem : customerOrder.getOrderItems()) {
            Product product =orderItem.getProduct();
            if (product == null) {
                return ResponseEntity.badRequest().body(null); // Product not found, return an error
            }
            if (inventoryService.getAvailableQuantity(product) < orderItem.getQuantityOrdered()) {
                return ResponseEntity.badRequest().body(null); // Insufficient inventory, return an error
            }
            // Update the available quantity of the product in the database
        }
        for (OrderItem orderItem : customerOrder.getOrderItems()) {
            Product product =orderItem.getProduct();
            // Update the available quantity of the product in the database
            inventoryService.removeQuantity(product,orderItem.getQuantityOrdered());
            productRepository.save(product);
        }
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
        return ResponseEntity.ok().build();
    }
}
