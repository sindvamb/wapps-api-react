package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EventCustomerDTO {

    private UUID id;

    @NotNull
    private String type;

    private Boolean approved;

    private UUID company;

    private UUID customer;

    @NotNull
    private UUID event;

}
