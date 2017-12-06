package com.smartCity.smartCity.Controllers;

import com.smartCity.smartCity.Entities.Parking;
import com.smartCity.smartCity.Entities.User;
import com.smartCity.smartCity.Repositories.ParkingRepository;
import com.smartCity.smartCity.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class UserController {


    private UserRepository userRepository;
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;

    }

    @RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @RequestMapping(value = "/addUser", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    @ResponseBody
    public void insertUser(@RequestParam String username,
                                 @RequestParam String password,
                                 @RequestParam String role){
        User user = new User(username,password,role);
        if(userRepository.findUserByUsernameAndPassword(user.getUsername(),user.getPassword()) == null){
            userRepository.save(user);
            System.out.println("Succes!");
        }


    }
}
