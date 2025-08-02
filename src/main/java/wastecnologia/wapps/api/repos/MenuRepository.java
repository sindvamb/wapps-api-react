package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Menu;


public interface MenuRepository extends JpaRepository<Menu, UUID> {

    Menu findFirstByCompany(Company company);

}
