package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.entity.MenuItem;


public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {

    MenuItem findFirstByMenu(Menu menu);

}
