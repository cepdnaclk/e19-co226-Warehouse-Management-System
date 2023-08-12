package com.databaseWHM.Warehouse.Management.System;

import com.databaseWHM.Warehouse.Management.System.jwtsecurity.models.ERole;
import com.databaseWHM.Warehouse.Management.System.jwtsecurity.models.Role;
import com.databaseWHM.Warehouse.Management.System.jwtsecurity.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class WarehouseManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(WarehouseManagementSystemApplication.class, args);
	}

	@Bean
	public CommandLineRunner initializeRoles(RoleRepository roleRepository) {
		return args -> {
			roleRepository.save(new Role(ERole.ROLE_USER,1));
			roleRepository.save(new Role(ERole.ROLE_MODERATOR,2));
			roleRepository.save(new Role(ERole.ROLE_ADMIN,3));
		};
	}

}
