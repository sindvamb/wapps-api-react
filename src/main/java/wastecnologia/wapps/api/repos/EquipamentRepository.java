package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Equipament;


public interface EquipamentRepository extends JpaRepository<Equipament, UUID> {

    Equipament findFirstByCompany(Company company);

}
