package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.TicketStatus;


public interface TicketStatusRepository extends JpaRepository<TicketStatus, UUID> {
}
