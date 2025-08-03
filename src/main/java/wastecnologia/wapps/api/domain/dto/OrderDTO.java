package wastecnologia.wapps.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderDTO {

    private UUID id;

    private String description;

    private String sigla;

    private String protocol;

    private OffsetDateTime dueDate;

    private Boolean enabled;

    private Integer orderIndex;

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
    private UUID orderStatus;

    @NotNull
    private UUID orderType;

    @NotNull
    private UUID partnerUnit;

    @NotNull
    private UUID productArea;

    @NotNull
    private UUID productCategory;

}
