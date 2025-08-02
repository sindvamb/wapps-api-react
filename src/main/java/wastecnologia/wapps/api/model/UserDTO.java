package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    private UUID id;

    private Integer matricula;

    @NotNull
    private String name;

    private String socialName;

    private String surname;

    private String gender;

    private String birthplace;

    private String civilStatus;

    private String fatherName;

    private String motherName;

    private String nationality;

    private String rg;

    private String ufIssuingBody;

    @NotNull
    private String cpfCnpj;

    private String email;

    private String password;

    private String race;

    private String profession;

    private String cellPhone;

    private String homePhone;

    private String businessPhone;

    @NotNull
    private Boolean hasSpecialNeeds;

    private String specialNeedsOther;

    @NotNull
    @JsonProperty("isSystem")
    private Boolean isSystem;

    @JsonProperty("isCustomer")
    private Boolean isCustomer;

    private String securelyPhrase;

    private Integer loginAttemps;

    private Boolean passwordPolicyEnabled;

    @NotNull
    private OffsetDateTime birthdate;

    private OffsetDateTime lastLoginAt;

    private OffsetDateTime lastPasswordChangedAt;

    private UUID passwordResetToken;

    private UUID creatorId;

    private UUID modifierId;

    private UUID deleterId;

    @NotNull
    @JsonProperty("isDeleted")
    private Boolean isDeleted;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private OffsetDateTime deletedAt;

    private UUID address;

    private UUID educationDegree;

    private UUID partnerUnit;

    private UUID role;

    private UUID userStatus;

}
