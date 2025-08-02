package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Role;


public interface RoleRepository extends JpaRepository<Role, UUID> {
}
