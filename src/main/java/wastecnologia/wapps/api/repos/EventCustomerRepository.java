package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.Event;
import wastecnologia.wapps.api.domain.EventCustomer;


public interface EventCustomerRepository extends JpaRepository<EventCustomer, UUID> {

    EventCustomer findFirstByCompany(Company company);

    EventCustomer findFirstByCustomer(Customer customer);

    EventCustomer findFirstByEvent(Event event);

}
