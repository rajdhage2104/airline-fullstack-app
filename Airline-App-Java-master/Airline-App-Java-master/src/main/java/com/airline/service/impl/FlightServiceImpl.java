package com.airline.service.impl;

import com.airline.model.Flight;
import com.airline.repository.FlightRepository;
import com.airline.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Override
    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public List<Flight> getAllFlight() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlight(int flightId) throws Exception {
       Flight flight = flightRepository.findById(flightId).orElseThrow(()->new Exception("No Flight with Id: "+flightId));
        return flight;
    }

    @Override
    public boolean deleteFlight(int flightId) {
        flightRepository.deleteById(flightId);
        return true;
    }

    @Override
    public Flight updateFlight(int flightId, Flight flight) {
        return flightRepository.save(flight);
    }


}
