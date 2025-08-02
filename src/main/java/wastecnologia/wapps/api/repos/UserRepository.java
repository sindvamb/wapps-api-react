package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Address;
import wastecnologia.wapps.api.domain.EducationDegree;
import wastecnologia.wapps.api.domain.PartnerUnit;
import wastecnologia.wapps.api.domain.Role;
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.domain.UserStatus;


public interface UserRepository extends JpaRepository<User, UUID> {

    User findFirstByAddress(Address address);

    User findFirstByEducationDegree(EducationDegree educationDegree);

    User findFirstByPartnerUnit(PartnerUnit partnerUnit);

    User findFirstByRole(Role role);

    User findFirstByUserStatus(UserStatus userStatus);

}
