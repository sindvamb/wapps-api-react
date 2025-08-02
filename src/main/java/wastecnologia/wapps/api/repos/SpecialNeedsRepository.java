package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.SpecialNeeds;
import wastecnologia.wapps.api.domain.User;


public interface SpecialNeedsRepository extends JpaRepository<SpecialNeeds, UUID> {

    SpecialNeeds findFirstByUser(User user);

}
