package es.urjc.eolicplants.planner.amqp;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class NewEoloPlantsConsumer {

    @RabbitListener(queues = "newEoloPlants", ackMode = "AUTO")
    public void received(String message) {

        System.out.println("Message: " + message);
    }

}
