package com.smartCity.smartCity.Controllers;

import com.smartCity.smartCity.Entities.Parking;
import com.smartCity.smartCity.Repositories.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api")
public class ParkController {

    private ParkingRepository parkingRepository;
    @Autowired
    public ParkController(ParkingRepository parkingRepository) {
        this.parkingRepository = parkingRepository;

    }


    @RequestMapping(value = "/parks", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseBody
    public List<Parking> getParks(){
        return parkingRepository.findAll();
    }
}
