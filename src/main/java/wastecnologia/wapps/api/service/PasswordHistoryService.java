package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.PasswordHistory;
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.model.PasswordHistoryDTO;
import wastecnologia.wapps.api.repos.PasswordHistoryRepository;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class PasswordHistoryService {

    private final PasswordHistoryRepository passwordHistoryRepository;
    private final UserRepository userRepository;

    public PasswordHistoryService(final PasswordHistoryRepository passwordHistoryRepository,
            final UserRepository userRepository) {
        this.passwordHistoryRepository = passwordHistoryRepository;
        this.userRepository = userRepository;
    }

    public List<PasswordHistoryDTO> findAll() {
        final List<PasswordHistory> passwordHistories = passwordHistoryRepository.findAll(Sort.by("id"));
        return passwordHistories.stream()
                .map(passwordHistory -> mapToDTO(passwordHistory, new PasswordHistoryDTO()))
                .toList();
    }

    public PasswordHistoryDTO get(final UUID id) {
        return passwordHistoryRepository.findById(id)
                .map(passwordHistory -> mapToDTO(passwordHistory, new PasswordHistoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final PasswordHistoryDTO passwordHistoryDTO) {
        final PasswordHistory passwordHistory = new PasswordHistory();
        mapToEntity(passwordHistoryDTO, passwordHistory);
        return passwordHistoryRepository.save(passwordHistory).getId();
    }

    public void update(final UUID id, final PasswordHistoryDTO passwordHistoryDTO) {
        final PasswordHistory passwordHistory = passwordHistoryRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(passwordHistoryDTO, passwordHistory);
        passwordHistoryRepository.save(passwordHistory);
    }

    public void delete(final UUID id) {
        passwordHistoryRepository.deleteById(id);
    }

    private PasswordHistoryDTO mapToDTO(final PasswordHistory passwordHistory,
            final PasswordHistoryDTO passwordHistoryDTO) {
        passwordHistoryDTO.setId(passwordHistory.getId());
        passwordHistoryDTO.setOldPassword(passwordHistory.getOldPassword());
        passwordHistoryDTO.setNewPassword(passwordHistory.getNewPassword());
        passwordHistoryDTO.setSecurityCode(passwordHistory.getSecurityCode());
        passwordHistoryDTO.setHasChanged(passwordHistory.getHasChanged());
        passwordHistoryDTO.setCreatorId(passwordHistory.getCreatorId());
        passwordHistoryDTO.setModifierId(passwordHistory.getModifierId());
        passwordHistoryDTO.setDeleterId(passwordHistory.getDeleterId());
        passwordHistoryDTO.setIsDeleted(passwordHistory.getIsDeleted());
        passwordHistoryDTO.setCreatedAt(passwordHistory.getCreatedAt());
        passwordHistoryDTO.setUpdatedAt(passwordHistory.getUpdatedAt());
        passwordHistoryDTO.setDeletedAt(passwordHistory.getDeletedAt());
        passwordHistoryDTO.setUser(passwordHistory.getUser() == null ? null : passwordHistory.getUser().getId());
        return passwordHistoryDTO;
    }

    private PasswordHistory mapToEntity(final PasswordHistoryDTO passwordHistoryDTO,
            final PasswordHistory passwordHistory) {
        passwordHistory.setOldPassword(passwordHistoryDTO.getOldPassword());
        passwordHistory.setNewPassword(passwordHistoryDTO.getNewPassword());
        passwordHistory.setSecurityCode(passwordHistoryDTO.getSecurityCode());
        passwordHistory.setHasChanged(passwordHistoryDTO.getHasChanged());
        passwordHistory.setCreatorId(passwordHistoryDTO.getCreatorId());
        passwordHistory.setModifierId(passwordHistoryDTO.getModifierId());
        passwordHistory.setDeleterId(passwordHistoryDTO.getDeleterId());
        passwordHistory.setIsDeleted(passwordHistoryDTO.getIsDeleted());
        passwordHistory.setCreatedAt(passwordHistoryDTO.getCreatedAt());
        passwordHistory.setUpdatedAt(passwordHistoryDTO.getUpdatedAt());
        passwordHistory.setDeletedAt(passwordHistoryDTO.getDeletedAt());
        final User user = passwordHistoryDTO.getUser() == null ? null : userRepository.findById(passwordHistoryDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        passwordHistory.setUser(user);
        return passwordHistory;
    }

}
