package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.RegistrationRequest;
import wastecnologia.wapps.api.domain.User;


public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, UUID> {

    RegistrationRequest findFirstByUser(User user);

}
