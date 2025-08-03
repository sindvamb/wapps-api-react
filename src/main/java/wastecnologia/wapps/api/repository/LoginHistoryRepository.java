package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.LoginHistory;
import wastecnologia.wapps.api.domain.entity.User;


public interface LoginHistoryRepository extends JpaRepository<LoginHistory, UUID> {

    LoginHistory findFirstByUser(User user);

}
