package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Partner;


public interface PartnerRepository extends JpaRepository<Partner, UUID> {
}
