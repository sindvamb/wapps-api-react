package wastecnologia.wapps.api.model;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EventMenuItemDTO {

    private UUID id;
    private UUID company;
    private UUID menuItem;
    private UUID menu;

}
