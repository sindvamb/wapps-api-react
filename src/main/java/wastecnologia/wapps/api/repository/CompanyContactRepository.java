package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.CompanyContact;


public interface CompanyContactRepository extends JpaRepository<CompanyContact, UUID> {

    CompanyContact findFirstByCompany(Company company);

}
