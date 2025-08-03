package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.entity.UserStatus;
import wastecnologia.wapps.api.domain.dto.UserStatusDTO;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.repository.UserStatusRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class UserStatusService {

    private final UserStatusRepository userStatusRepository;
    private final UserRepository userRepository;

    public UserStatusService(final UserStatusRepository userStatusRepository,
            final UserRepository userRepository) {
        this.userStatusRepository = userStatusRepository;
        this.userRepository = userRepository;
    }

    public List<UserStatusDTO> findAll() {
        final List<UserStatus> userStatuses = userStatusRepository.findAll(Sort.by("id"));
        return userStatuses.stream()
                .map(userStatus -> mapToDTO(userStatus, new UserStatusDTO()))
                .toList();
    }

    public UserStatusDTO get(final UUID id) {
        return userStatusRepository.findById(id)
                .map(userStatus -> mapToDTO(userStatus, new UserStatusDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final UserStatusDTO userStatusDTO) {
        final UserStatus userStatus = new UserStatus();
        mapToEntity(userStatusDTO, userStatus);
        return userStatusRepository.save(userStatus).getId();
    }

    public void update(final UUID id, final UserStatusDTO userStatusDTO) {
        final UserStatus userStatus = userStatusRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userStatusDTO, userStatus);
        userStatusRepository.save(userStatus);
    }

    public void delete(final UUID id) {
        userStatusRepository.deleteById(id);
    }

    private UserStatusDTO mapToDTO(final UserStatus userStatus, final UserStatusDTO userStatusDTO) {
        userStatusDTO.setId(userStatus.getId());
        userStatusDTO.setCode(userStatus.getCode());
        userStatusDTO.setDescription(userStatus.getDescription());
        return userStatusDTO;
    }

    private UserStatus mapToEntity(final UserStatusDTO userStatusDTO, final UserStatus userStatus) {
        userStatus.setCode(userStatusDTO.getCode());
        userStatus.setDescription(userStatusDTO.getDescription());
        return userStatus;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final UserStatus userStatus = userStatusRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final User userStatusUser = userRepository.findFirstByUserStatus(userStatus);
        if (userStatusUser != null) {
            referencedWarning.setKey("userStatus.user.userStatus.referenced");
            referencedWarning.addParam(userStatusUser.getId());
            return referencedWarning;
        }
        return null;
    }

}
