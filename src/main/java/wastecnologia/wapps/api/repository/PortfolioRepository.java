package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Portfolio;


public interface PortfolioRepository extends JpaRepository<Portfolio, UUID> {

    Portfolio findFirstByCompany(Company company);

}
