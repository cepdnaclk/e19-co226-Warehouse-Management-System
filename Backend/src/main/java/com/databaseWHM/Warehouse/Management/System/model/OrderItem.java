package com.databaseWHM.Warehouse.Management.System.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productID")
    private Product product;

    private int quantityOrdered;
    private double unitPrice;
}
