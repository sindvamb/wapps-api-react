package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.CustomerType;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.User;


public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    Customer findFirstByCustomerType(CustomerType customerType);

    Customer findFirstByPartnerUnit(PartnerUnit partnerUnit);

    Customer findFirstByUser(User user);

}
