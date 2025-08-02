package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.EventMenuItem;
import wastecnologia.wapps.api.domain.Menu;
import wastecnologia.wapps.api.domain.MenuItem;


public interface EventMenuItemRepository extends JpaRepository<EventMenuItem, UUID> {

    EventMenuItem findFirstByCompany(Company company);

    EventMenuItem findFirstByMenuItem(MenuItem menuItem);

    EventMenuItem findFirstByMenu(Menu menu);

}
