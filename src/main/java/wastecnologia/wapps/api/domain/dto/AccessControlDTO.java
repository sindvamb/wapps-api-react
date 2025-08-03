package wastecnologia.wapps.api.domain.dto;

import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AccessControlDTO {

    private UUID id;

    private UUID userId;

    private String userName;

    private OffsetDateTime connectionTime;

    private OffsetDateTime lastBeatTime;

    @Size(max = 255)
    private String dur;

    private String ip;

    private String city;

    private String os;

    private String device;

    private String browser;

    private String language;

    private String engine;

    private String requestUrl;

}
