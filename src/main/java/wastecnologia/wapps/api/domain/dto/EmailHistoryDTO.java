package wastecnologia.wapps.api.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EmailHistoryDTO {

    private UUID id;

    private UUID userId;

    @NotNull
    @JsonProperty("isSuccess")
    private Boolean isSuccess;

    @NotNull
    private String reason;

    @NotNull
    private String email;

    @NotNull
    private String templateKey;

    @NotNull
    private String data;

    @NotNull
    private String ipAddress;

    @NotNull
    private String messageId;

    @NotNull
    private OffsetDateTime date;

}
