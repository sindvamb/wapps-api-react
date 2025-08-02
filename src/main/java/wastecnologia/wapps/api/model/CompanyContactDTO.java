package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CompanyContactDTO {

    private UUID id;

    private String area;

    @NotNull
    private String name;

    @NotNull
    private String role;

    private String corporateEmail;

    private String phone;

    private String corporateCellPhone;

    private String personalCellPhone;

    @NotNull
    private UUID company;

}
