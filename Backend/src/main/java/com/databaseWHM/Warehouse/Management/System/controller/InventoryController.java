package com.databaseWHM.Warehouse.Management.System.controller;


import com.databaseWHM.Warehouse.Management.System.model.Inventory;
import com.databaseWHM.Warehouse.Management.System.model.Product;
import com.databaseWHM.Warehouse.Management.System.repository.InventoryRepository;
import com.databaseWHM.Warehouse.Management.System.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    @Autowired
    public InventoryController(InventoryRepository inventoryRepository, ProductRepository productRepository) {
        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
    }


    // Get all inventories
    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    // Get a single inventory by ID
    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable long id) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(id);
        return inventoryOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create or Update an inventory
// Create or Update an inventory
    @PostMapping("/{SKU}/{productId}")
    public ResponseEntity<Inventory> createOrUpdateInventory(
            @PathVariable long SKU,
            @PathVariable long productId,
            @RequestBody Inventory inventory
    ) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product not found with productId: " + productId));
        inventory.setProduct(product);
        inventory.setSKU(SKU);
        Inventory savedInventory = inventoryRepository.save(inventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedInventory);
    }


    // Update an existing inventory
    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable long id, @RequestBody Inventory inventory) {
        Optional<Inventory> existingInventoryOptional = inventoryRepository.findById(id);
        if (existingInventoryOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

//        inventory.setInventoryId(id);
        Inventory updatedInventory = inventoryRepository.save(inventory);
        return ResponseEntity.ok(updatedInventory);
    }

    // Delete an inventory by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable long id) {
        Optional<Inventory> existingInventoryOptional = inventoryRepository.findById(id);
        if (existingInventoryOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        inventoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
