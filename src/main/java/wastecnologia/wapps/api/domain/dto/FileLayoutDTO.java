package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FileLayoutDTO {

    private UUID id;

    @NotNull
    private String layoutName;

    @NotNull
    private Short layoutSize;

}
