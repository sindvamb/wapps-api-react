package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderEmail;
import wastecnologia.wapps.api.domain.Ticket;


public interface OrderEmailRepository extends JpaRepository<OrderEmail, UUID> {

    OrderEmail findFirstByOrder(Order order);

    OrderEmail findFirstByTicket(Ticket ticket);

}
