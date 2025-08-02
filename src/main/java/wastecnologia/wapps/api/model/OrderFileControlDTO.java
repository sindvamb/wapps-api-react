package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderFileControlDTO {

    private UUID id;

    @NotNull
    private UUID fileControl;

    @NotNull
    private UUID order;

}
