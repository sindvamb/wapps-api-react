package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.ApplicationConfig;
import wastecnologia.wapps.api.domain.dto.ApplicationConfigDTO;
import wastecnologia.wapps.api.repository.ApplicationConfigRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class ApplicationConfigService {

    private final ApplicationConfigRepository applicationConfigRepository;

    public ApplicationConfigService(final ApplicationConfigRepository applicationConfigRepository) {
        this.applicationConfigRepository = applicationConfigRepository;
    }

    public List<ApplicationConfigDTO> findAll() {
        final List<ApplicationConfig> applicationConfigs = applicationConfigRepository.findAll(Sort.by("id"));
        return applicationConfigs.stream()
                .map(applicationConfig -> mapToDTO(applicationConfig, new ApplicationConfigDTO()))
                .toList();
    }

    public ApplicationConfigDTO get(final UUID id) {
        return applicationConfigRepository.findById(id)
                .map(applicationConfig -> mapToDTO(applicationConfig, new ApplicationConfigDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ApplicationConfigDTO applicationConfigDTO) {
        final ApplicationConfig applicationConfig = new ApplicationConfig();
        mapToEntity(applicationConfigDTO, applicationConfig);
        return applicationConfigRepository.save(applicationConfig).getId();
    }

    public void update(final UUID id, final ApplicationConfigDTO applicationConfigDTO) {
        final ApplicationConfig applicationConfig = applicationConfigRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(applicationConfigDTO, applicationConfig);
        applicationConfigRepository.save(applicationConfig);
    }

    public void delete(final UUID id) {
        applicationConfigRepository.deleteById(id);
    }

    private ApplicationConfigDTO mapToDTO(final ApplicationConfig applicationConfig,
            final ApplicationConfigDTO applicationConfigDTO) {
        applicationConfigDTO.setId(applicationConfig.getId());
        applicationConfigDTO.setValue(applicationConfig.getValue());
        applicationConfigDTO.setDescription(applicationConfig.getDescription());
        applicationConfigDTO.setCreatorId(applicationConfig.getCreatorId());
        applicationConfigDTO.setModifierId(applicationConfig.getModifierId());
        applicationConfigDTO.setDeleterId(applicationConfig.getDeleterId());
        applicationConfigDTO.setIsDeleted(applicationConfig.getIsDeleted());
        applicationConfigDTO.setCreatedAt(applicationConfig.getCreatedAt());
        applicationConfigDTO.setUpdatedAt(applicationConfig.getUpdatedAt());
        applicationConfigDTO.setDeletedAt(applicationConfig.getDeletedAt());
        return applicationConfigDTO;
    }

    private ApplicationConfig mapToEntity(final ApplicationConfigDTO applicationConfigDTO,
            final ApplicationConfig applicationConfig) {
        applicationConfig.setValue(applicationConfigDTO.getValue());
        applicationConfig.setDescription(applicationConfigDTO.getDescription());
        applicationConfig.setCreatorId(applicationConfigDTO.getCreatorId());
        applicationConfig.setModifierId(applicationConfigDTO.getModifierId());
        applicationConfig.setDeleterId(applicationConfigDTO.getDeleterId());
        applicationConfig.setIsDeleted(applicationConfigDTO.getIsDeleted());
        applicationConfig.setCreatedAt(applicationConfigDTO.getCreatedAt());
        applicationConfig.setUpdatedAt(applicationConfigDTO.getUpdatedAt());
        applicationConfig.setDeletedAt(applicationConfigDTO.getDeletedAt());
        return applicationConfig;
    }

}
