package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Equipament;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.EventEquipament;


public interface EventEquipamentRepository extends JpaRepository<EventEquipament, UUID> {

    EventEquipament findFirstByCompany(Company company);

    EventEquipament findFirstByEquipament(Equipament equipament);

    EventEquipament findFirstByEventCustomer(EventCustomer eventCustomer);

}
