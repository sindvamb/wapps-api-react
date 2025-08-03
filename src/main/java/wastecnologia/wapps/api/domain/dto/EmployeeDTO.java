package wastecnologia.wapps.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EmployeeDTO {

    private UUID id;

    @NotNull
    private String name;

    @NotNull
    private String cpfCnpj;

    private String description;

    private String cellPhone;

    @NotNull
    private String position;

    @NotNull
    @JsonProperty("isApprentice")
    private Boolean isApprentice;

    private UUID customerId;

    private String address;

    private UUID company;

}
