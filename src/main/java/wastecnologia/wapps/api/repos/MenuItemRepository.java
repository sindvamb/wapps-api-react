package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Menu;
import wastecnologia.wapps.api.domain.MenuItem;


public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {

    MenuItem findFirstByMenu(Menu menu);

}
