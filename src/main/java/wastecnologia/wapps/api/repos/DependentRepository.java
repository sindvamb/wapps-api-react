package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.Dependent;


public interface DependentRepository extends JpaRepository<Dependent, UUID> {

    Dependent findFirstByCustomer(Customer customer);

}
