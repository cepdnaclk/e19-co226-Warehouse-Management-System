package com.databaseWHM.Warehouse.Management.System.service;

import com.databaseWHM.Warehouse.Management.System.model.Inventory;
import com.databaseWHM.Warehouse.Management.System.model.Product;
import com.databaseWHM.Warehouse.Management.System.repository.InventoryRepository;
import com.databaseWHM.Warehouse.Management.System.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public int getAvailableQuantity(Product product) {
        List<Inventory> inventoryList = inventoryRepository.findByProduct(product);
        int sum=0;
        for (Inventory inventoryItem : inventoryList) {
            sum=sum+inventoryItem.getQuantityInStock();
        }
        return sum;
    }
    public void removeQuantity(Product product, int quantity) {
        List<Inventory> inventoryList = inventoryRepository.findByProduct(product);
        for (Inventory inventoryItem : inventoryList) {
            int value=inventoryItem.getQuantityInStock();
            if(value>=quantity){
                inventoryItem.setQuantityInStock(value-quantity);
                quantity=0;
                if(inventoryItem.getQuantityInStock()==0){
                    inventoryRepository.deleteById(inventoryItem.getSKU());
                }
            }else{
                inventoryItem.setQuantityInStock(0);
                quantity=quantity-value;
            }

        }
        inventoryRepository.saveAll(inventoryList);
    }
}
