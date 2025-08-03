package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    Employee findFirstByCompany(Company company);

}
