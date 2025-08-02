package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Audit;
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.model.AuditDTO;
import wastecnologia.wapps.api.repos.AuditRepository;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class AuditService {

    private final AuditRepository auditRepository;
    private final UserRepository userRepository;

    public AuditService(final AuditRepository auditRepository,
            final UserRepository userRepository) {
        this.auditRepository = auditRepository;
        this.userRepository = userRepository;
    }

    public List<AuditDTO> findAll() {
        final List<Audit> audits = auditRepository.findAll(Sort.by("id"));
        return audits.stream()
                .map(audit -> mapToDTO(audit, new AuditDTO()))
                .toList();
    }

    public AuditDTO get(final UUID id) {
        return auditRepository.findById(id)
                .map(audit -> mapToDTO(audit, new AuditDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final AuditDTO auditDTO) {
        final Audit audit = new Audit();
        mapToEntity(auditDTO, audit);
        return auditRepository.save(audit).getId();
    }

    public void update(final UUID id, final AuditDTO auditDTO) {
        final Audit audit = auditRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(auditDTO, audit);
        auditRepository.save(audit);
    }

    public void delete(final UUID id) {
        auditRepository.deleteById(id);
    }

    private AuditDTO mapToDTO(final Audit audit, final AuditDTO auditDTO) {
        auditDTO.setId(audit.getId());
        auditDTO.setTableName(audit.getTableName());
        auditDTO.setKeyValues(audit.getKeyValues());
        auditDTO.setOldValues(audit.getOldValues());
        auditDTO.setNewValues(audit.getNewValues());
        auditDTO.setIpAddress(audit.getIpAddress());
        auditDTO.setUser(audit.getUser() == null ? null : audit.getUser().getId());
        return auditDTO;
    }

    private Audit mapToEntity(final AuditDTO auditDTO, final Audit audit) {
        audit.setTableName(auditDTO.getTableName());
        audit.setKeyValues(auditDTO.getKeyValues());
        audit.setOldValues(auditDTO.getOldValues());
        audit.setNewValues(auditDTO.getNewValues());
        audit.setIpAddress(auditDTO.getIpAddress());
        final User user = auditDTO.getUser() == null ? null : userRepository.findById(auditDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        audit.setUser(user);
        return audit;
    }

}
