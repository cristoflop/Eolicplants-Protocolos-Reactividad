package es.urjc.eolicplants.planner.amqp.dtos;

public class NewEoloPlantDto {
    String id;
    String city;

    public NewEoloPlantDto(String id, String city) {
        this.id = id;
        this.city = city;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "NewEoloPlantDto{" +
                "id='" + id + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
