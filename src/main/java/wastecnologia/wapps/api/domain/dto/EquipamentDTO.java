package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EquipamentDTO {

    private UUID id;

    @NotNull
    private String name;

    private String description;

    private String voltage;

    private String type;

    private String weight;

    private UUID customerId;

    private UUID company;

}
