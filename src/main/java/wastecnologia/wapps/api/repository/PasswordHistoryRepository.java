package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.PasswordHistory;
import wastecnologia.wapps.api.domain.entity.User;


public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, UUID> {

    PasswordHistory findFirstByUser(User user);

}
