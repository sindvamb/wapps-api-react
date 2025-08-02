package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.CustomerType;
import wastecnologia.wapps.api.domain.PartnerUnit;
import wastecnologia.wapps.api.domain.User;


public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Customer findFirstByCustomerType(CustomerType customerType);

    Customer findFirstByPartnerUnit(PartnerUnit partnerUnit);

    Customer findFirstByUser(User user);

}
