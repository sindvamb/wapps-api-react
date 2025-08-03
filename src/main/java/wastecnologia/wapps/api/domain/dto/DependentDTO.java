package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DependentDTO {

    private UUID id;

    @NotNull
    private String name;

    private String cpfCnpj;

    private String email;

    private String cellPhone;

    private String type;

    @NotNull
    private UUID customer;

}
