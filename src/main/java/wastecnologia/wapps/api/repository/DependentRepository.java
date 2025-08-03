package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Dependent;


public interface DependentRepository extends JpaRepository<Dependent, UUID> {

    Dependent findFirstByCustomer(Customer customer);

}
