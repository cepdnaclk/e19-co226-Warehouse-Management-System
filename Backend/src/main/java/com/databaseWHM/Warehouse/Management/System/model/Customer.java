package com.databaseWHM.Warehouse.Management.System.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data//getters and setters
@NoArgsConstructor//no argument constructor
@AllArgsConstructor//constructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int CustomerID;
    private String CustomerName;
    private String AddressLine1;
    private String AddressLine2;
    private String AddressLine3;
    private String PhoneNumber;
    private String Email;
}
