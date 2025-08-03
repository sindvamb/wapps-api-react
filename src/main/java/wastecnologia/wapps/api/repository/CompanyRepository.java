package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Customer;


public interface CompanyRepository extends JpaRepository<Company, UUID> {

    Company findFirstByAddress(Address address);

    Company findFirstByCustomer(Customer customer);

}
