package wastecnologia.wapps.api.model;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CustomerTypeDTO {

    private UUID id;
    private String code;
    private String description;

}
