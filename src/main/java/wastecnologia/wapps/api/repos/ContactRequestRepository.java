package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Contact;
import wastecnologia.wapps.api.domain.ContactRequest;


public interface ContactRequestRepository extends JpaRepository<ContactRequest, UUID> {

    ContactRequest findFirstByContact(Contact contact);

}
