package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.UserStatus;


public interface UserStatusRepository extends JpaRepository<UserStatus, UUID> {
}
