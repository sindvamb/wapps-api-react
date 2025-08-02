package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.Ticket;
import wastecnologia.wapps.api.domain.TicketStatus;


public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    Ticket findFirstByCustomer(Customer customer);

    Ticket findFirstByOrder(Order order);

    Ticket findFirstByTicketStatus(TicketStatus ticketStatus);

}
