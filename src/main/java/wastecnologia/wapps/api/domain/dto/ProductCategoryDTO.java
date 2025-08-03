package wastecnologia.wapps.api.domain.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ProductCategoryDTO {

    private UUID id;
    private String code;
    private String description;

}
