package es.urjc.eolicplants.toposervice.domain;

import es.urjc.eolicplants.toposervice.exception.EmptyCityException;

public class Landscape {

    LandscapeValue value;

    public Landscape(String city) {
        if (city.isEmpty()) {
            throw new EmptyCityException("City name can't be empty");
        }

    }

}
