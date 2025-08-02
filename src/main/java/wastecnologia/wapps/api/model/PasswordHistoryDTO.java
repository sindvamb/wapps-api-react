package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PasswordHistoryDTO {

    private UUID id;

    private String oldPassword;

    @NotNull
    private String newPassword;

    @NotNull
    private String securityCode;

    @NotNull
    private Boolean hasChanged;

    private UUID creatorId;

    private UUID modifierId;

    private UUID deleterId;

    @NotNull
    @JsonProperty("isDeleted")
    private Boolean isDeleted;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private OffsetDateTime deletedAt;

    @NotNull
    private UUID user;

}
