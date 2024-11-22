package com.airline.controller;

import com.airline.model.Flight;
import com.airline.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/flight")
@CrossOrigin(origins = "*")
public class FlightController {

    @Autowired
    private FlightService flightService;

    //To Add flight
    @PostMapping("/")
    public ResponseEntity<Flight> addFlight(@RequestBody Flight flight){
        Flight flight1 = flightService.addFlight(flight);
        return new ResponseEntity<>(flight1, HttpStatus.CREATED);
    }

    //To Get all flights
    @GetMapping("/")
    public ResponseEntity<List<Flight>> getAllFlight(){
        List<Flight> allFlight = flightService.getAllFlight();
        return new ResponseEntity<>(allFlight,HttpStatus.OK);
    }

    //To Get flight
    @GetMapping("/{flightId}")
    public ResponseEntity<Flight> getFlight(@PathVariable("flightId") int flightId) throws Exception {
        return ResponseEntity.ok(flightService.getFlight(flightId));
    }

    //To delete flight
    @DeleteMapping("/{flightId}")
    public ResponseEntity<String> deleteFlight(@PathVariable("flightId") int flightId){
        flightService.deleteFlight(flightId);
        return new ResponseEntity<String>("Flight ID: "+flightId,HttpStatus.OK);
    }

    //To update flight
    @PutMapping("/{flightId}")
    public ResponseEntity<Flight> updateFlight(@PathVariable("flightId") int flightId,@RequestBody Flight flight) throws Exception {
        flight.setFlightId(flightId);
        Flight flight1 = flightService.updateFlight(flightId,flight);
        return new ResponseEntity<>(flight1,HttpStatus.OK);
    }

}
