package es.urjc.eolicplants.toposervice.application.dtos;

public class LandscapeResponseDto {

    private final String id;
    private final String landscape;

    public LandscapeResponseDto(String id, String landscape) {
        this.id = id;
        this.landscape = landscape;
    }

    public String getId() {
        return id;
    }

    public String getLandscape() {
        return landscape;
    }

}