package wastecnologia.wapps.api.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Dependent;
import wastecnologia.wapps.api.domain.entity.Event;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.entity.FileLayout;
import wastecnologia.wapps.api.domain.entity.Portfolio;
import wastecnologia.wapps.api.domain.entity.User;


public interface FileControlRepository extends JpaRepository<FileControl, UUID> {

    FileControl findFirstByCompany(Company company);

    FileControl findFirstByDependent(Dependent dependent);

    FileControl findFirstByEventCustomer(EventCustomer eventCustomer);

    FileControl findFirstByEvent(Event event);

    FileControl findFirstByLayout(FileLayout fileLayout);

    FileControl findFirstByPortfolio(Portfolio portfolio);

    FileControl findFirstByUser(User user);

}
