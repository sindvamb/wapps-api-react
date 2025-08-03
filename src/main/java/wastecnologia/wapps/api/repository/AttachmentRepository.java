package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Attachment;
import wastecnologia.wapps.api.domain.entity.Ticket;


public interface AttachmentRepository extends JpaRepository<Attachment, UUID> {

    Attachment findFirstByTicket(Ticket ticket);

}
