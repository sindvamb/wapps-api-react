package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderEmailDTO {

    private UUID id;

    @NotNull
    private String email;

    @NotNull
    private UUID order;

    private UUID ticket;

}
