package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.EventMenu;
import wastecnologia.wapps.api.domain.entity.Menu;


public interface EventMenuRepository extends JpaRepository<EventMenu, UUID> {

    EventMenu findFirstByCompany(Company company);

    EventMenu findFirstByEventCustomer(EventCustomer eventCustomer);

    EventMenu findFirstByMenu(Menu menu);

}
