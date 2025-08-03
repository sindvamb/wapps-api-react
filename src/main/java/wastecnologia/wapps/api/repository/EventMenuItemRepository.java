package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.EventMenuItem;
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.entity.MenuItem;


public interface EventMenuItemRepository extends JpaRepository<EventMenuItem, UUID> {

    EventMenuItem findFirstByCompany(Company company);

    EventMenuItem findFirstByMenuItem(MenuItem menuItem);

    EventMenuItem findFirstByMenu(Menu menu);

}
