package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.RegistrationRequest;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.RegistrationRequestDTO;
import wastecnologia.wapps.api.repository.RegistrationRequestRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class RegistrationRequestService {

    private final RegistrationRequestRepository registrationRequestRepository;
    private final UserRepository userRepository;

    public RegistrationRequestService(
            final RegistrationRequestRepository registrationRequestRepository,
            final UserRepository userRepository) {
        this.registrationRequestRepository = registrationRequestRepository;
        this.userRepository = userRepository;
    }

    public List<RegistrationRequestDTO> findAll() {
        final List<RegistrationRequest> registrationRequests = registrationRequestRepository.findAll(Sort.by("id"));
        return registrationRequests.stream()
                .map(registrationRequest -> mapToDTO(registrationRequest, new RegistrationRequestDTO()))
                .toList();
    }

    public RegistrationRequestDTO get(final UUID id) {
        return registrationRequestRepository.findById(id)
                .map(registrationRequest -> mapToDTO(registrationRequest, new RegistrationRequestDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final RegistrationRequestDTO registrationRequestDTO) {
        final RegistrationRequest registrationRequest = new RegistrationRequest();
        mapToEntity(registrationRequestDTO, registrationRequest);
        return registrationRequestRepository.save(registrationRequest).getId();
    }

    public void update(final UUID id, final RegistrationRequestDTO registrationRequestDTO) {
        final RegistrationRequest registrationRequest = registrationRequestRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(registrationRequestDTO, registrationRequest);
        registrationRequestRepository.save(registrationRequest);
    }

    public void delete(final UUID id) {
        registrationRequestRepository.deleteById(id);
    }

    private RegistrationRequestDTO mapToDTO(final RegistrationRequest registrationRequest,
            final RegistrationRequestDTO registrationRequestDTO) {
        registrationRequestDTO.setId(registrationRequest.getId());
        registrationRequestDTO.setApproved(registrationRequest.getApproved());
        registrationRequestDTO.setReason(registrationRequest.getReason());
        registrationRequestDTO.setProtocol(registrationRequest.getProtocol());
        registrationRequestDTO.setDate(registrationRequest.getDate());
        registrationRequestDTO.setUser(registrationRequest.getUser() == null ? null : registrationRequest.getUser().getId());
        return registrationRequestDTO;
    }

    private RegistrationRequest mapToEntity(final RegistrationRequestDTO registrationRequestDTO,
            final RegistrationRequest registrationRequest) {
        registrationRequest.setApproved(registrationRequestDTO.getApproved());
        registrationRequest.setReason(registrationRequestDTO.getReason());
        registrationRequest.setProtocol(registrationRequestDTO.getProtocol());
        registrationRequest.setDate(registrationRequestDTO.getDate());
        final User user = registrationRequestDTO.getUser() == null ? null : userRepository.findById(registrationRequestDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        registrationRequest.setUser(user);
        return registrationRequest;
    }

}
