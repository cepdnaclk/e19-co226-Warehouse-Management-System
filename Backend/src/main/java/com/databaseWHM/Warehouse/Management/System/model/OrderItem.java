package com.databaseWHM.Warehouse.Management.System.model;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private CustomerOrder customerOrder;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    private int quantityOrdered;
    private double unitPrice;
}
