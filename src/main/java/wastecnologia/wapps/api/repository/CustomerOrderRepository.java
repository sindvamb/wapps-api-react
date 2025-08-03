package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.CustomerOrder;
import wastecnologia.wapps.api.domain.entity.Order;


public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, UUID> {

    CustomerOrder findFirstByCustomer(Customer customer);

    CustomerOrder findFirstByOrder(Order order);

}
