package wastecnologia.wapps.api.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import wastecnologia.wapps.api.domain.EfmigrationsHistory;


public interface EfmigrationsHistoryRepository extends JpaRepository<EfmigrationsHistory, String> {

    boolean existsByMigrationIdIgnoreCase(String migrationId);

}
