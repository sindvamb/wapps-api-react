package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.EducationDegree;


public interface EducationDegreeRepository extends JpaRepository<EducationDegree, UUID> {
}
