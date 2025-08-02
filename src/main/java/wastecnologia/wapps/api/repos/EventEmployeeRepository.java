package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Employee;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.EventEmployee;


public interface EventEmployeeRepository extends JpaRepository<EventEmployee, UUID> {

    EventEmployee findFirstByCompany(Company company);

    EventEmployee findFirstByEmployee(Employee employee);

    EventEmployee findFirstByEventCustomer(EventCustomer eventCustomer);

}
