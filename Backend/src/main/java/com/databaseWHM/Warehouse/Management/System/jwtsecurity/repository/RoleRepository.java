package com.databaseWHM.Warehouse.Management.System.jwtsecurity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.databaseWHM.Warehouse.Management.System.jwtsecurity.models.ERole;
import com.databaseWHM.Warehouse.Management.System.jwtsecurity.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
