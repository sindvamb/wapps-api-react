package wastecnologia.wapps.api.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.EfmigrationsHistory;
import wastecnologia.wapps.api.model.EfmigrationsHistoryDTO;
import wastecnologia.wapps.api.repos.EfmigrationsHistoryRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class EfmigrationsHistoryService {

    private final EfmigrationsHistoryRepository efmigrationsHistoryRepository;

    public EfmigrationsHistoryService(
            final EfmigrationsHistoryRepository efmigrationsHistoryRepository) {
        this.efmigrationsHistoryRepository = efmigrationsHistoryRepository;
    }

    public List<EfmigrationsHistoryDTO> findAll() {
        final List<EfmigrationsHistory> efmigrationsHistories = efmigrationsHistoryRepository.findAll(Sort.by("migrationId"));
        return efmigrationsHistories.stream()
                .map(efmigrationsHistory -> mapToDTO(efmigrationsHistory, new EfmigrationsHistoryDTO()))
                .toList();
    }

    public EfmigrationsHistoryDTO get(final String migrationId) {
        return efmigrationsHistoryRepository.findById(migrationId)
                .map(efmigrationsHistory -> mapToDTO(efmigrationsHistory, new EfmigrationsHistoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final EfmigrationsHistoryDTO efmigrationsHistoryDTO) {
        final EfmigrationsHistory efmigrationsHistory = new EfmigrationsHistory();
        mapToEntity(efmigrationsHistoryDTO, efmigrationsHistory);
        efmigrationsHistory.setMigrationId(efmigrationsHistoryDTO.getMigrationId());
        return efmigrationsHistoryRepository.save(efmigrationsHistory).getMigrationId();
    }

    public void update(final String migrationId,
            final EfmigrationsHistoryDTO efmigrationsHistoryDTO) {
        final EfmigrationsHistory efmigrationsHistory = efmigrationsHistoryRepository.findById(migrationId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(efmigrationsHistoryDTO, efmigrationsHistory);
        efmigrationsHistoryRepository.save(efmigrationsHistory);
    }

    public void delete(final String migrationId) {
        efmigrationsHistoryRepository.deleteById(migrationId);
    }

    private EfmigrationsHistoryDTO mapToDTO(final EfmigrationsHistory efmigrationsHistory,
            final EfmigrationsHistoryDTO efmigrationsHistoryDTO) {
        efmigrationsHistoryDTO.setMigrationId(efmigrationsHistory.getMigrationId());
        efmigrationsHistoryDTO.setProductVersion(efmigrationsHistory.getProductVersion());
        return efmigrationsHistoryDTO;
    }

    private EfmigrationsHistory mapToEntity(final EfmigrationsHistoryDTO efmigrationsHistoryDTO,
            final EfmigrationsHistory efmigrationsHistory) {
        efmigrationsHistory.setProductVersion(efmigrationsHistoryDTO.getProductVersion());
        return efmigrationsHistory;
    }

    public boolean migrationIdExists(final String migrationId) {
        return efmigrationsHistoryRepository.existsByMigrationIdIgnoreCase(migrationId);
    }

}
