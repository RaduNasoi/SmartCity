package com.smartCity.smartCity.Repositories;

import com.smartCity.smartCity.Entities.Parking;
import com.smartCity.smartCity.Entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll();

    User findUserByUsernameAndPassword(String username, String password);
}
