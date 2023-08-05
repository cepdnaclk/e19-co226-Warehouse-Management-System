package com.databaseWHM.Warehouse.Management.System.controller;


import com.databaseWHM.Warehouse.Management.System.model.Inventory;
import com.databaseWHM.Warehouse.Management.System.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
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
    @PostMapping
    public ResponseEntity<Inventory> createOrUpdateInventory(@RequestBody Inventory inventory) {
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
