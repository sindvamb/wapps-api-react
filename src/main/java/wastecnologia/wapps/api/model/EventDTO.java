package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EventDTO {

    private UUID id;

    @NotNull
    private String name;

    @NotNull
    private String placeRealization;

    private String address;

    @NotNull
    private String description;

    private String eventType;

    @NotNull
    private String city;

    @NotNull
    private String uf;

    @NotNull
    private String programing;

    @NotNull
    private String assemblyInstructions;

    private OffsetDateTime partyPaymentDate;

    private OffsetDateTime partyDate;

    @Schema(type = "string", example = "18:30")
    private LocalTime timeStart;

    @Schema(type = "string", example = "18:30")
    private LocalTime timeEnd;

    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "30.08")
    private BigDecimal tentValue;

    @Digits(integer = 10, fraction = 2)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "32.08")
    private BigDecimal circulatingValue;

    private UUID creatorId;

    private UUID modifierId;

    private UUID deleterId;

    @NotNull
    @JsonProperty("isDeleted")
    private Boolean isDeleted;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private OffsetDateTime deletedAt;

}
