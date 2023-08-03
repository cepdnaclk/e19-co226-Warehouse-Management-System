package com.databaseWHM.Warehouse.Management.System.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data//getters and setters
@NoArgsConstructor//no argument constructor
@AllArgsConstructor//constructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long customerID;
    private String customerName;
    private String addressLine1;
    private String addressLine2;
    private String addressLine3;
    private String phoneNumber;
    private String email;
}
