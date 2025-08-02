package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderTracking;


public interface OrderTrackingRepository extends JpaRepository<OrderTracking, UUID> {

    OrderTracking findFirstByOrder(Order order);

}
