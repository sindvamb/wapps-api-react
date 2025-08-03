package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Contact;
import wastecnologia.wapps.api.domain.entity.ContactRequest;


public interface ContactRequestRepository extends JpaRepository<ContactRequest, UUID> {

    ContactRequest findFirstByContact(Contact contact);

}
