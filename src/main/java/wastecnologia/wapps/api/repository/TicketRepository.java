package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.entity.TicketStatus;


public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    Ticket findFirstByCustomer(Customer customer);

    Ticket findFirstByOrder(Order order);

    Ticket findFirstByTicketStatus(TicketStatus ticketStatus);

}
