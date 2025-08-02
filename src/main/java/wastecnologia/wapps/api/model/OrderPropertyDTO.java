package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderPropertyDTO {

    private UUID id;

    private String value;

    @NotNull
    private UUID order;

}
