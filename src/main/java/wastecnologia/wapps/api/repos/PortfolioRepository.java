package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Portfolio;


public interface PortfolioRepository extends JpaRepository<Portfolio, UUID> {

    Portfolio findFirstByCompany(Company company);

}
