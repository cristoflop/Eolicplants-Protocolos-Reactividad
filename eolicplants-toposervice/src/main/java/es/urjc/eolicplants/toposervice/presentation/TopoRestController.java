package es.urjc.eolicplants.toposervice.presentation;

import es.urjc.eolicplants.toposervice.application.TopoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TopoRestController {

    private final TopoService topoService;

    public TopoRestController(TopoService topoService) {
        this.topoService = topoService;
    }

    @GetMapping("/api/topographicdetails/{city}")
    public ResponseEntity<Void> getTopographicDetails(@RequestParam("city") String city) {

        return null;
    }

}