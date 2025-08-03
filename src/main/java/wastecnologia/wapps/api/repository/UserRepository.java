package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.EducationDegree;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.Role;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.entity.UserStatus;


public interface UserRepository extends JpaRepository<User, UUID> {

    User findFirstByAddress(Address address);

    User findFirstByEducationDegree(EducationDegree educationDegree);

    User findFirstByPartnerUnit(PartnerUnit partnerUnit);

    User findFirstByRole(Role role);

    User findFirstByUserStatus(UserStatus userStatus);

}
