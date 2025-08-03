package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.SpecialNeeds;
import wastecnologia.wapps.api.domain.entity.User;


public interface SpecialNeedsRepository extends JpaRepository<SpecialNeeds, UUID> {

    SpecialNeeds findFirstByUser(User user);

}
