package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Address;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Customer;


public interface CompanyRepository extends JpaRepository<Company, UUID> {

    Company findFirstByAddress(Address address);

    Company findFirstByCustomer(Customer customer);

}
