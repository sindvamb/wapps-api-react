package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Employee;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.EventEmployee;


public interface EventEmployeeRepository extends JpaRepository<EventEmployee, UUID> {

    EventEmployee findFirstByCompany(Company company);

    EventEmployee findFirstByEmployee(Employee employee);

    EventEmployee findFirstByEventCustomer(EventCustomer eventCustomer);

}
