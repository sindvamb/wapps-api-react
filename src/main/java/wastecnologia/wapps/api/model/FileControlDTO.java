package wastecnologia.wapps.api.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FileControlDTO {

    private UUID id;

    @NotNull
    private String fileName;

    @NotNull
    @Digits(integer = 18, fraction = 4)
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Schema(type = "string", example = "95.0008")
    private BigDecimal fileSize;

    @NotNull
    private String fileArray;

    private String targetPath;

    @NotNull
    private String contentType;

    private String description;

    private Boolean approved;

    private UUID company;

    private UUID dependent;

    private UUID eventCustomer;

    private UUID event;

    private UUID layout;

    private UUID portfolio;

    private UUID user;

}
