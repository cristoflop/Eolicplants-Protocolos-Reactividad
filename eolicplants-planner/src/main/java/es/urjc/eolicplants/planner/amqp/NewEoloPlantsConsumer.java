package es.urjc.eolicplants.planner.amqp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.urjc.eolicplants.planner.application.EoloPlantService;
import es.urjc.eolicplants.planner.application.dtos.NewEoloPlantDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NewEoloPlantsConsumer {

    private final ObjectMapper objectMapper;
    private final EoloPlantService eoloPlantService;

    public NewEoloPlantsConsumer(ObjectMapper objectMapper, EoloPlantService eoloPlantService) {
        this.objectMapper = objectMapper;
        this.eoloPlantService = eoloPlantService;
    }

    @RabbitListener(queues = "newEoloPlantsQueue", ackMode = "AUTO")
    public void received(String newEoloPlantJson) throws JsonProcessingException {
        // Aqui se reciben los mensajes desde el publicador y se procesan
        System.out.println("Message: " + newEoloPlantJson);
        NewEoloPlantDto newEoloPlantDto = this.objectMapper.readValue(newEoloPlantJson, NewEoloPlantDto.class);
        this.eoloPlantService.newEoloPlant(newEoloPlantDto);
        System.out.println("Converted json: " + newEoloPlantDto);
    }


}