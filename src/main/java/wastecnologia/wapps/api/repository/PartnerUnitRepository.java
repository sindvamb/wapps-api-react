package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Partner;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;


public interface PartnerUnitRepository extends JpaRepository<PartnerUnit, UUID> {

    PartnerUnit findFirstByPartner(Partner partner);

}
