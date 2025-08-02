package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.CustomerOrder;
import wastecnologia.wapps.api.domain.Order;


public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, UUID> {

    CustomerOrder findFirstByCustomer(Customer customer);

    CustomerOrder findFirstByOrder(Order order);

}
