package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Ticket;
import wastecnologia.wapps.api.domain.TicketProperty;


public interface TicketPropertyRepository extends JpaRepository<TicketProperty, UUID> {

    TicketProperty findFirstByTicket(Ticket ticket);

}
