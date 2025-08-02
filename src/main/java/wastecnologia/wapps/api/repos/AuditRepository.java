package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Audit;
import wastecnologia.wapps.api.domain.User;


public interface AuditRepository extends JpaRepository<Audit, UUID> {

    Audit findFirstByUser(User user);

}
