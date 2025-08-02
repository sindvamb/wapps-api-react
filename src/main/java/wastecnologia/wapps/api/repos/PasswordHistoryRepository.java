package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.PasswordHistory;
import wastecnologia.wapps.api.domain.User;


public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, UUID> {

    PasswordHistory findFirstByUser(User user);

}
