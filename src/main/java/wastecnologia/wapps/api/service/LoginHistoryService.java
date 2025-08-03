package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.LoginHistory;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.LoginHistoryDTO;
import wastecnologia.wapps.api.repository.LoginHistoryRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class LoginHistoryService {

    private final LoginHistoryRepository loginHistoryRepository;
    private final UserRepository userRepository;

    public LoginHistoryService(final LoginHistoryRepository loginHistoryRepository,
            final UserRepository userRepository) {
        this.loginHistoryRepository = loginHistoryRepository;
        this.userRepository = userRepository;
    }

    public List<LoginHistoryDTO> findAll() {
        final List<LoginHistory> loginHistories = loginHistoryRepository.findAll(Sort.by("id"));
        return loginHistories.stream()
                .map(loginHistory -> mapToDTO(loginHistory, new LoginHistoryDTO()))
                .toList();
    }

    public LoginHistoryDTO get(final UUID id) {
        return loginHistoryRepository.findById(id)
                .map(loginHistory -> mapToDTO(loginHistory, new LoginHistoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final LoginHistoryDTO loginHistoryDTO) {
        final LoginHistory loginHistory = new LoginHistory();
        mapToEntity(loginHistoryDTO, loginHistory);
        return loginHistoryRepository.save(loginHistory).getId();
    }

    public void update(final UUID id, final LoginHistoryDTO loginHistoryDTO) {
        final LoginHistory loginHistory = loginHistoryRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(loginHistoryDTO, loginHistory);
        loginHistoryRepository.save(loginHistory);
    }

    public void delete(final UUID id) {
        loginHistoryRepository.deleteById(id);
    }

    private LoginHistoryDTO mapToDTO(final LoginHistory loginHistory,
            final LoginHistoryDTO loginHistoryDTO) {
        loginHistoryDTO.setId(loginHistory.getId());
        loginHistoryDTO.setIsSuccess(loginHistory.getIsSuccess());
        loginHistoryDTO.setReason(loginHistory.getReason());
        loginHistoryDTO.setIpAddress(loginHistory.getIpAddress());
        loginHistoryDTO.setDate(loginHistory.getDate());
        loginHistoryDTO.setUser(loginHistory.getUser() == null ? null : loginHistory.getUser().getId());
        return loginHistoryDTO;
    }

    private LoginHistory mapToEntity(final LoginHistoryDTO loginHistoryDTO,
            final LoginHistory loginHistory) {
        loginHistory.setIsSuccess(loginHistoryDTO.getIsSuccess());
        loginHistory.setReason(loginHistoryDTO.getReason());
        loginHistory.setIpAddress(loginHistoryDTO.getIpAddress());
        loginHistory.setDate(loginHistoryDTO.getDate());
        final User user = loginHistoryDTO.getUser() == null ? null : userRepository.findById(loginHistoryDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        loginHistory.setUser(user);
        return loginHistory;
    }

}
