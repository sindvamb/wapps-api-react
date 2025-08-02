package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Contact;
import wastecnologia.wapps.api.domain.ContactRequest;
import wastecnologia.wapps.api.model.ContactRequestDTO;
import wastecnologia.wapps.api.repos.ContactRepository;
import wastecnologia.wapps.api.repos.ContactRequestRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class ContactRequestService {

    private final ContactRequestRepository contactRequestRepository;
    private final ContactRepository contactRepository;

    public ContactRequestService(final ContactRequestRepository contactRequestRepository,
            final ContactRepository contactRepository) {
        this.contactRequestRepository = contactRequestRepository;
        this.contactRepository = contactRepository;
    }

    public List<ContactRequestDTO> findAll() {
        final List<ContactRequest> contactRequests = contactRequestRepository.findAll(Sort.by("id"));
        return contactRequests.stream()
                .map(contactRequest -> mapToDTO(contactRequest, new ContactRequestDTO()))
                .toList();
    }

    public ContactRequestDTO get(final UUID id) {
        return contactRequestRepository.findById(id)
                .map(contactRequest -> mapToDTO(contactRequest, new ContactRequestDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ContactRequestDTO contactRequestDTO) {
        final ContactRequest contactRequest = new ContactRequest();
        mapToEntity(contactRequestDTO, contactRequest);
        return contactRequestRepository.save(contactRequest).getId();
    }

    public void update(final UUID id, final ContactRequestDTO contactRequestDTO) {
        final ContactRequest contactRequest = contactRequestRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(contactRequestDTO, contactRequest);
        contactRequestRepository.save(contactRequest);
    }

    public void delete(final UUID id) {
        contactRequestRepository.deleteById(id);
    }

    private ContactRequestDTO mapToDTO(final ContactRequest contactRequest,
            final ContactRequestDTO contactRequestDTO) {
        contactRequestDTO.setId(contactRequest.getId());
        contactRequestDTO.setSubject(contactRequest.getSubject());
        contactRequestDTO.setProfile(contactRequest.getProfile());
        contactRequestDTO.setMessage(contactRequest.getMessage());
        contactRequestDTO.setResponse(contactRequest.getResponse());
        contactRequestDTO.setHasViewd(contactRequest.getHasViewd());
        contactRequestDTO.setHasAnswered(contactRequest.getHasAnswered());
        contactRequestDTO.setHasPendding(contactRequest.getHasPendding());
        contactRequestDTO.setAnsweredDate(contactRequest.getAnsweredDate());
        contactRequestDTO.setCreatedAt(contactRequest.getCreatedAt());
        contactRequestDTO.setContact(contactRequest.getContact() == null ? null : contactRequest.getContact().getId());
        return contactRequestDTO;
    }

    private ContactRequest mapToEntity(final ContactRequestDTO contactRequestDTO,
            final ContactRequest contactRequest) {
        contactRequest.setSubject(contactRequestDTO.getSubject());
        contactRequest.setProfile(contactRequestDTO.getProfile());
        contactRequest.setMessage(contactRequestDTO.getMessage());
        contactRequest.setResponse(contactRequestDTO.getResponse());
        contactRequest.setHasViewd(contactRequestDTO.getHasViewd());
        contactRequest.setHasAnswered(contactRequestDTO.getHasAnswered());
        contactRequest.setHasPendding(contactRequestDTO.getHasPendding());
        contactRequest.setAnsweredDate(contactRequestDTO.getAnsweredDate());
        contactRequest.setCreatedAt(contactRequestDTO.getCreatedAt());
        final Contact contact = contactRequestDTO.getContact() == null ? null : contactRepository.findById(contactRequestDTO.getContact())
                .orElseThrow(() -> new NotFoundException("contact not found"));
        contactRequest.setContact(contact);
        return contactRequest;
    }

}
