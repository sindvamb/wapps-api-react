package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    Employee findFirstByCompany(Company company);

}
