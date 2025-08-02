package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.EmailHistory;
import wastecnologia.wapps.api.model.EmailHistoryDTO;
import wastecnologia.wapps.api.repos.EmailHistoryRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class EmailHistoryService {

    private final EmailHistoryRepository emailHistoryRepository;

    public EmailHistoryService(final EmailHistoryRepository emailHistoryRepository) {
        this.emailHistoryRepository = emailHistoryRepository;
    }

    public List<EmailHistoryDTO> findAll() {
        final List<EmailHistory> emailHistories = emailHistoryRepository.findAll(Sort.by("id"));
        return emailHistories.stream()
                .map(emailHistory -> mapToDTO(emailHistory, new EmailHistoryDTO()))
                .toList();
    }

    public EmailHistoryDTO get(final UUID id) {
        return emailHistoryRepository.findById(id)
                .map(emailHistory -> mapToDTO(emailHistory, new EmailHistoryDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EmailHistoryDTO emailHistoryDTO) {
        final EmailHistory emailHistory = new EmailHistory();
        mapToEntity(emailHistoryDTO, emailHistory);
        return emailHistoryRepository.save(emailHistory).getId();
    }

    public void update(final UUID id, final EmailHistoryDTO emailHistoryDTO) {
        final EmailHistory emailHistory = emailHistoryRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(emailHistoryDTO, emailHistory);
        emailHistoryRepository.save(emailHistory);
    }

    public void delete(final UUID id) {
        emailHistoryRepository.deleteById(id);
    }

    private EmailHistoryDTO mapToDTO(final EmailHistory emailHistory,
            final EmailHistoryDTO emailHistoryDTO) {
        emailHistoryDTO.setId(emailHistory.getId());
        emailHistoryDTO.setUserId(emailHistory.getUserId());
        emailHistoryDTO.setIsSuccess(emailHistory.getIsSuccess());
        emailHistoryDTO.setReason(emailHistory.getReason());
        emailHistoryDTO.setEmail(emailHistory.getEmail());
        emailHistoryDTO.setTemplateKey(emailHistory.getTemplateKey());
        emailHistoryDTO.setData(emailHistory.getData());
        emailHistoryDTO.setIpAddress(emailHistory.getIpAddress());
        emailHistoryDTO.setMessageId(emailHistory.getMessageId());
        emailHistoryDTO.setDate(emailHistory.getDate());
        return emailHistoryDTO;
    }

    private EmailHistory mapToEntity(final EmailHistoryDTO emailHistoryDTO,
            final EmailHistory emailHistory) {
        emailHistory.setUserId(emailHistoryDTO.getUserId());
        emailHistory.setIsSuccess(emailHistoryDTO.getIsSuccess());
        emailHistory.setReason(emailHistoryDTO.getReason());
        emailHistory.setEmail(emailHistoryDTO.getEmail());
        emailHistory.setTemplateKey(emailHistoryDTO.getTemplateKey());
        emailHistory.setData(emailHistoryDTO.getData());
        emailHistory.setIpAddress(emailHistoryDTO.getIpAddress());
        emailHistory.setMessageId(emailHistoryDTO.getMessageId());
        emailHistory.setDate(emailHistoryDTO.getDate());
        return emailHistory;
    }

}
