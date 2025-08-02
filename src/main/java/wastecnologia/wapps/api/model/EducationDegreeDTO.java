package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EducationDegreeDTO {

    private UUID id;

    @NotNull
    private String code;

    @NotNull
    private String description;

}
