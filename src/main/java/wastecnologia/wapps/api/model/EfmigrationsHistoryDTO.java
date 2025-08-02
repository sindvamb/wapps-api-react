package wastecnologia.wapps.api.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EfmigrationsHistoryDTO {

    @Size(max = 150)
    @EfmigrationsHistoryMigrationIdValid
    private String migrationId;

    @NotNull
    @Size(max = 32)
    private String productVersion;

}
