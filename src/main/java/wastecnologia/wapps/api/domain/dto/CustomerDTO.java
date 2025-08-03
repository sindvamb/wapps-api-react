package wastecnologia.wapps.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CustomerDTO {

    private UUID id;

    private UUID creatorId;

    private UUID modifierId;

    private UUID deleterId;

    @NotNull
    @JsonProperty("isDeleted")
    private Boolean isDeleted;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private OffsetDateTime deletedAt;

    private UUID companyId;

    private UUID customerType;

    private UUID partnerUnit;

    @NotNull
    private UUID user;

}
