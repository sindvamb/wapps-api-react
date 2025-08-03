package wastecnologia.wapps.api.domain.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderStatusDTO {

    private UUID id;
    private String code;
    private String description;

}
