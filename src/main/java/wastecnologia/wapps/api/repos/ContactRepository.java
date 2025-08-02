package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Address;
import wastecnologia.wapps.api.domain.Contact;


public interface ContactRepository extends JpaRepository<Contact, UUID> {

    Contact findFirstByAddress(Address address);

}
