package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ContactRequestDTO {

    private UUID id;

    @NotNull
    private String subject;

    @NotNull
    private String profile;

    @NotNull
    private String message;

    private String response;

    @NotNull
    private Boolean hasViewd;

    @NotNull
    private Boolean hasAnswered;

    @NotNull
    private Boolean hasPendding;

    private OffsetDateTime answeredDate;

    @NotNull
    private OffsetDateTime createdAt;

    private UUID contact;

}
