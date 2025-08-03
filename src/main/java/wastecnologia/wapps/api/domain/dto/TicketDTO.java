package wastecnologia.wapps.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TicketDTO {

    private UUID id;

    private String solution;

    @NotNull
    private OffsetDateTime dueDate;

    private Boolean active;

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

    private UUID ticketStatus;

}
