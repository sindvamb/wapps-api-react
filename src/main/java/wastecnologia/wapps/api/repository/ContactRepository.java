package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Contact;


public interface ContactRepository extends JpaRepository<Contact, UUID> {

    Contact findFirstByAddress(Address address);

}
