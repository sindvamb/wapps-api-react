package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ContactDTO {

    private UUID id;

    @NotNull
    private String name;

    private String cpfCnpj;

    private String email;

    private String phone;

    private String cellPhone;

    private String fax;

    private String mainActivityCode;

    private String economicActivity;

    private UUID address;

}
