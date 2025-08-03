package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Audit;
import wastecnologia.wapps.api.domain.entity.User;


public interface AuditRepository extends JpaRepository<Audit, UUID> {

    Audit findFirstByUser(User user);

}
