package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.entity.TicketProperty;


public interface TicketPropertyRepository extends JpaRepository<TicketProperty, UUID> {

    TicketProperty findFirstByTicket(Ticket ticket);

}
