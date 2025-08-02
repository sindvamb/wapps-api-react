package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.CompanyContact;


public interface CompanyContactRepository extends JpaRepository<CompanyContact, UUID> {

    CompanyContact findFirstByCompany(Company company);

}
