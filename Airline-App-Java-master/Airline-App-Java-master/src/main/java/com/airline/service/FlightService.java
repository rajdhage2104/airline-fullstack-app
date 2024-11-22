package com.airline.service;

import com.airline.model.Flight;
import org.springframework.stereotype.Service;

import java.util.List;


public interface FlightService {

    //To add flight
    Flight addFlight(Flight flight);

    //To Get all Flights
    List<Flight> getAllFlight();

    //To Get Single Flight
    Flight getFlight(int flightId) throws Exception;

    //To Delete Flight
    boolean deleteFlight(int flightId);

    //To Update Flight
    Flight updateFlight(int flightId,Flight flight);
}
