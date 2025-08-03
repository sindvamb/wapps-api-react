package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RoleDTO {

    private UUID id;

    @NotNull
    private String value;

    @NotNull
    private String description;

}
