package es.urjc.eolicplants.toposervice.domain;

import java.util.Arrays;
import java.util.List;

public enum LandscapeValue {

    FLAT("flat"),
    MOUNTAIN("mountain");

    private static final List<Character> vowels = Arrays.asList('a', 'e', 'i', 'o', 'u');
    private final String value;

    LandscapeValue(String value) {
        this.value = value;
    }

    public static LandscapeValue parse(char initial) {
        if (vowels.contains(initial)) {
            return FLAT;
        }
        return MOUNTAIN;
    }

    @Override
    public String toString() {
        return value;
    }

}
