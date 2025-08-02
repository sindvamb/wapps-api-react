package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.FileControl;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderFileControl;


public interface OrderFileControlRepository extends JpaRepository<OrderFileControl, UUID> {

    OrderFileControl findFirstByFileControl(FileControl fileControl);

    OrderFileControl findFirstByOrder(Order order);

}
