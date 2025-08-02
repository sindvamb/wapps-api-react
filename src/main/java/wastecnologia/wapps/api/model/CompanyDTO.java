package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CompanyDTO {

    private UUID id;

    private OffsetDateTime foundationDate;

    @NotNull
    private String cpfCnpj;

    @NotNull
    private Integer size;

    @NotNull
    private String corporateName;

    private String stateRegistration;

    private String municipalRegistration;

    private String mainCnaeCode;

    private String mainCnaeDescription;

    private String legalNatureCode;

    private String legalNatureDescription;

    @NotNull
    private Integer status;

    @NotNull
    private Boolean hasGovBrRegistration;

    @NotNull
    private Boolean hasDigitalCertificate;

    private String tradeName;

    @NotNull
    private Boolean hasLogo;

    @NotNull
    private Boolean hasVisualIdentity;

    private String inpiRegistration;

    private String businessLaw;

    private Integer employeesCount;

    private Integer youngApprenticesCount;

    @NotNull
    private Boolean usesESocial;

    private String sebraeTraining;

    private String senacTraining;

    private String anvisaTraining;

    private String civilDefenseTraining;

    private String website;

    private String email;

    private UUID creatorId;

    private UUID modifierId;

    private UUID deleterId;

    @NotNull
    @JsonProperty("isDeleted")
    private Boolean isDeleted;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private OffsetDateTime deletedAt;

    private OffsetDateTime paymentDate;

    private UUID address;

    private UUID customer;

}
