package com.databaseWHM.Warehouse.Management.System.jwtsecurity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.databaseWHM.Warehouse.Management.System.jwtsecurity.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);
  User findByEmail(String email);


  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}
