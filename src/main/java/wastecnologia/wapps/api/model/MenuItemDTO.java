package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class MenuItemDTO {

    private UUID id;

    @NotNull
    private String name;

    private String description;

    private String quantity;

    private String type;

    private String gramish;

    private String measuredUnit;

    @NotNull
    private UUID menu;

}
