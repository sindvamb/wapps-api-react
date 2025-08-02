package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderTrackingDTO {

    private UUID id;

    @NotNull
    private OffsetDateTime trackDate;

    private String history;

    @NotNull
    private UUID order;

}
