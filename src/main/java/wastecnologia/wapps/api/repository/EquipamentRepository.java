package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Equipament;


public interface EquipamentRepository extends JpaRepository<Equipament, UUID> {

    Equipament findFirstByCompany(Company company);

}
