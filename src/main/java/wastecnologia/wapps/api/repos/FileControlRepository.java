package wastecnologia.wapps.api.repos;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Dependent;
import wastecnologia.wapps.api.domain.Event;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.FileControl;
import wastecnologia.wapps.api.domain.FileLayout;
import wastecnologia.wapps.api.domain.Portfolio;
import wastecnologia.wapps.api.domain.User;


public interface FileControlRepository extends JpaRepository<FileControl, UUID> {

    FileControl findFirstByCompany(Company company);

    FileControl findFirstByDependent(Dependent dependent);

    FileControl findFirstByEventCustomer(EventCustomer eventCustomer);

    FileControl findFirstByEvent(Event event);

    FileControl findFirstByLayout(FileLayout fileLayout);

    FileControl findFirstByPortfolio(Portfolio portfolio);

    FileControl findFirstByUser(User user);

}
