package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.RegistrationRequest;
import wastecnologia.wapps.api.domain.entity.User;


public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, UUID> {

    RegistrationRequest findFirstByUser(User user);

}
