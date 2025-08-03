package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Event;
import wastecnologia.wapps.api.domain.entity.EventCustomer;


public interface EventCustomerRepository extends JpaRepository<EventCustomer, UUID> {

    EventCustomer findFirstByCompany(Company company);

    EventCustomer findFirstByCustomer(Customer customer);

    EventCustomer findFirstByEvent(Event event);

}
