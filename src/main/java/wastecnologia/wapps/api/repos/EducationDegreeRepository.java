package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.EducationDegree;


public interface EducationDegreeRepository extends JpaRepository<EducationDegree, UUID> {
}
