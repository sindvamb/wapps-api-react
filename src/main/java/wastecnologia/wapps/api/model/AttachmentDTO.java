package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AttachmentDTO {

    private UUID id;

    @NotNull
    @Digits(integer = 18, fraction = 4)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "57.0008")
    private BigDecimal size;

    @NotNull
    private String name;

    @NotNull
    private String contentType;

    @NotNull
    @JsonProperty("isPublic")
    private Boolean isPublic;

    @NotNull
    private String description;

    @NotNull
    private String path;

    @NotNull
    private String absoluteUrl;

    @NotNull
    private Boolean inCloud;

    @NotNull
    private String fileData;

    private UUID ticket;

}
