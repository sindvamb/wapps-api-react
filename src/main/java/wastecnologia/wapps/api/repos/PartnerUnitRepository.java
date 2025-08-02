package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Partner;
import wastecnologia.wapps.api.domain.PartnerUnit;


public interface PartnerUnitRepository extends JpaRepository<PartnerUnit, UUID> {

    PartnerUnit findFirstByPartner(Partner partner);

}
