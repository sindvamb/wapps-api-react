package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderEmail;
import wastecnologia.wapps.api.domain.entity.Ticket;


public interface OrderEmailRepository extends JpaRepository<OrderEmail, UUID> {

    OrderEmail findFirstByOrder(Order order);

    OrderEmail findFirstByTicket(Ticket ticket);

}
