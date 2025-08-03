package wastecnologia.wapps.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CustomerOrderDTO {

    private UUID id;

    @NotNull
    @JsonProperty("isWapps")
    private Boolean isWapps;

    @NotNull
    @JsonProperty("isPresidency")
    private Boolean isPresidency;

    @NotNull
    @JsonProperty("isClient")
    private Boolean isClient;

    @NotNull
    @JsonProperty("isDirector")
    private Boolean isDirector;

    @NotNull
    @JsonProperty("isManager")
    private Boolean isManager;

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
    private UUID customer;

    @NotNull
    private UUID order;

}
