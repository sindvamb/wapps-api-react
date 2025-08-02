package wastecnologia.wapps.api.model;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AddressDTO {

    private UUID id;
    private String zipCode;
    private String neighborhood;
    private String addressLine1;
    private String addressLine2;
    private String complement;
    private Long number;
    private String city;
    private String district;
    private String uf;
    private String housing;

}
