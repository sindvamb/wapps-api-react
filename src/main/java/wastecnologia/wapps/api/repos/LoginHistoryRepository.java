package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.LoginHistory;
import wastecnologia.wapps.api.domain.User;


public interface LoginHistoryRepository extends JpaRepository<LoginHistory, UUID> {

    LoginHistory findFirstByUser(User user);

}
