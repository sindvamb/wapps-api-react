package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderFileControl;


public interface OrderFileControlRepository extends JpaRepository<OrderFileControl, UUID> {

    OrderFileControl findFirstByFileControl(FileControl fileControl);

    OrderFileControl findFirstByOrder(Order order);

}
