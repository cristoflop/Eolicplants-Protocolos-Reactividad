package es.urjc.eolicplants.planner.amqp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import es.urjc.eolicplants.planner.amqp.dtos.NewEoloPlantDto;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NewEoloPlantsConsumer {

    private final ObjectMapper objectMapper;

    public NewEoloPlantsConsumer(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @RabbitListener(queues = "newEoloPlantsQueue", ackMode = "AUTO")
    public void received(String newEoloPlantJson) throws JsonProcessingException {
        // Aqui se reciben los mensajes desde el publicador y se procesan
        System.out.println("Message: " + newEoloPlantJson);
        NewEoloPlantDto newEoloPlantDto = this.objectMapper.readValue(newEoloPlantJson, NewEoloPlantDto.class);
        System.out.println("Converted json: " + newEoloPlantDto);
    }


}
