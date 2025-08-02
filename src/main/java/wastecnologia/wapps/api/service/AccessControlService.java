package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.AccessControl;
import wastecnologia.wapps.api.model.AccessControlDTO;
import wastecnologia.wapps.api.repos.AccessControlRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class AccessControlService {

    private final AccessControlRepository accessControlRepository;

    public AccessControlService(final AccessControlRepository accessControlRepository) {
        this.accessControlRepository = accessControlRepository;
    }

    public List<AccessControlDTO> findAll() {
        final List<AccessControl> accessControls = accessControlRepository.findAll(Sort.by("id"));
        return accessControls.stream()
                .map(accessControl -> mapToDTO(accessControl, new AccessControlDTO()))
                .toList();
    }

    public AccessControlDTO get(final UUID id) {
        return accessControlRepository.findById(id)
                .map(accessControl -> mapToDTO(accessControl, new AccessControlDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final AccessControlDTO accessControlDTO) {
        final AccessControl accessControl = new AccessControl();
        mapToEntity(accessControlDTO, accessControl);
        return accessControlRepository.save(accessControl).getId();
    }

    public void update(final UUID id, final AccessControlDTO accessControlDTO) {
        final AccessControl accessControl = accessControlRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(accessControlDTO, accessControl);
        accessControlRepository.save(accessControl);
    }

    public void delete(final UUID id) {
        accessControlRepository.deleteById(id);
    }

    private AccessControlDTO mapToDTO(final AccessControl accessControl,
            final AccessControlDTO accessControlDTO) {
        accessControlDTO.setId(accessControl.getId());
        accessControlDTO.setUserId(accessControl.getUserId());
        accessControlDTO.setUserName(accessControl.getUserName());
        accessControlDTO.setConnectionTime(accessControl.getConnectionTime());
        accessControlDTO.setLastBeatTime(accessControl.getLastBeatTime());
        accessControlDTO.setDur(accessControl.getDur());
        accessControlDTO.setIp(accessControl.getIp());
        accessControlDTO.setCity(accessControl.getCity());
        accessControlDTO.setOs(accessControl.getOs());
        accessControlDTO.setDevice(accessControl.getDevice());
        accessControlDTO.setBrowser(accessControl.getBrowser());
        accessControlDTO.setLanguage(accessControl.getLanguage());
        accessControlDTO.setEngine(accessControl.getEngine());
        accessControlDTO.setRequestUrl(accessControl.getRequestUrl());
        return accessControlDTO;
    }

    private AccessControl mapToEntity(final AccessControlDTO accessControlDTO,
            final AccessControl accessControl) {
        accessControl.setUserId(accessControlDTO.getUserId());
        accessControl.setUserName(accessControlDTO.getUserName());
        accessControl.setConnectionTime(accessControlDTO.getConnectionTime());
        accessControl.setLastBeatTime(accessControlDTO.getLastBeatTime());
        accessControl.setDur(accessControlDTO.getDur());
        accessControl.setIp(accessControlDTO.getIp());
        accessControl.setCity(accessControlDTO.getCity());
        accessControl.setOs(accessControlDTO.getOs());
        accessControl.setDevice(accessControlDTO.getDevice());
        accessControl.setBrowser(accessControlDTO.getBrowser());
        accessControl.setLanguage(accessControlDTO.getLanguage());
        accessControl.setEngine(accessControlDTO.getEngine());
        accessControl.setRequestUrl(accessControlDTO.getRequestUrl());
        return accessControl;
    }

}
