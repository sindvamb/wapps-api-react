package wastecnologia.wapps.api.domain.dto;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuditDTO {

    private UUID id;
    private String tableName;
    private String keyValues;
    private String oldValues;
    private String newValues;
    private String ipAddress;
    private UUID user;

}
