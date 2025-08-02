package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.EventMenu;
import wastecnologia.wapps.api.domain.Menu;


public interface EventMenuRepository extends JpaRepository<EventMenu, UUID> {

    EventMenu findFirstByCompany(Company company);

    EventMenu findFirstByEventCustomer(EventCustomer eventCustomer);

    EventMenu findFirstByMenu(Menu menu);

}
