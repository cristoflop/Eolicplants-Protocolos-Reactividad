package es.urjc.eolicplants.planner.amqp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.urjc.eolicplants.planner.application.EoloPlantService;
import es.urjc.eolicplants.planner.application.dtos.NewEoloPlantDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class EoloplantCreationRequestsConsumer {

    private final ObjectMapper objectMapper;
    private final EoloPlantService eoloPlantService;

    public EoloplantCreationRequestsConsumer(ObjectMapper objectMapper, EoloPlantService eoloPlantService) {
        this.objectMapper = objectMapper;
        this.eoloPlantService = eoloPlantService;
    }

    @RabbitListener(queues = RabbitQueueNames.eoloplantCreationRequests, ackMode = "AUTO")
    public void received(String newEoloPlantJson) throws JsonProcessingException {
        // Aqui se reciben los mensajes desde el publicador y se procesan
        System.out.println("Message: " + newEoloPlantJson);
        NewEoloPlantDto newEoloPlantDto = this.objectMapper.readValue(newEoloPlantJson, NewEoloPlantDto.class);
        this.eoloPlantService.newEoloPlant(newEoloPlantDto);
        System.out.println("Converted json: " + newEoloPlantDto);
    }
    
}