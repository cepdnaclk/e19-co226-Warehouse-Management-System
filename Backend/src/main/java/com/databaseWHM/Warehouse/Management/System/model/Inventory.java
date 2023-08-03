package com.databaseWHM.Warehouse.Management.System.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data//getters and setters
@NoArgsConstructor//no argument constructor
@AllArgsConstructor//constructor
public class Inventory {
    @Id
    private String SKU;
    private int quantityInStock;
    private String location;

    @OneToOne
    @JoinColumn(name = "productID", referencedColumnName = "productID")
    private Product product;
}
