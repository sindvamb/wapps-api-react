package wastecnologia.wapps.api.domain.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EventEquipamentDTO {

    private UUID id;
    private UUID company;
    private UUID equipament;
    private UUID eventCustomer;

}
