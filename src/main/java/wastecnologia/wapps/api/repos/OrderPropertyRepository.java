package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderProperty;


public interface OrderPropertyRepository extends JpaRepository<OrderProperty, UUID> {

    OrderProperty findFirstByOrder(Order order);

}
