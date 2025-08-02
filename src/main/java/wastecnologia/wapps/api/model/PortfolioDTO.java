package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PortfolioDTO {

    private UUID id;

    @NotNull
    private String title;

    private String filePath;

    private UUID customerId;

    private UUID company;

}
