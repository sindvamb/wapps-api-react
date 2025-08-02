package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginHistoryDTO {

    private UUID id;

    @NotNull
    @JsonProperty("isSuccess")
    private Boolean isSuccess;

    @NotNull
    private String reason;

    @NotNull
    private String ipAddress;

    @NotNull
    private OffsetDateTime date;

    @NotNull
    private UUID user;

}
