package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Attachment;
import wastecnologia.wapps.api.domain.Ticket;


public interface AttachmentRepository extends JpaRepository<Attachment, UUID> {

    Attachment findFirstByTicket(Ticket ticket);

}
