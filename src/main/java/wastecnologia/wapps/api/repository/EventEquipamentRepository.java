package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Equipament;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.EventEquipament;


public interface EventEquipamentRepository extends JpaRepository<EventEquipament, UUID> {

    EventEquipament findFirstByCompany(Company company);

    EventEquipament findFirstByEquipament(Equipament equipament);

    EventEquipament findFirstByEventCustomer(EventCustomer eventCustomer);

}
