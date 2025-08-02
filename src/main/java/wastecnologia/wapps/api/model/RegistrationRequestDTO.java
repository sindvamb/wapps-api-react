package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RegistrationRequestDTO {

    private UUID id;

    private Boolean approved;

    private String reason;

    @NotNull
    private String protocol;

    @NotNull
    private OffsetDateTime date;

    @NotNull
    private UUID user;

}
