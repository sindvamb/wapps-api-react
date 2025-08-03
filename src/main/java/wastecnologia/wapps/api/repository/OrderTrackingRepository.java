package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderTracking;


public interface OrderTrackingRepository extends JpaRepository<OrderTracking, UUID> {

    OrderTracking findFirstByOrder(Order order);

}
