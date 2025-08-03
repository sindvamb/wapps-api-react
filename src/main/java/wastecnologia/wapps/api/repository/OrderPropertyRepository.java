package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderProperty;


public interface OrderPropertyRepository extends JpaRepository<OrderProperty, UUID> {

    OrderProperty findFirstByOrder(Order order);

}
