package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Contact;
import wastecnologia.wapps.api.domain.entity.ContactRequest;
import wastecnologia.wapps.api.domain.dto.ContactDTO;
import wastecnologia.wapps.api.repository.AddressRepository;
import wastecnologia.wapps.api.repository.ContactRepository;
import wastecnologia.wapps.api.repository.ContactRequestRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final AddressRepository addressRepository;
    private final ContactRequestRepository contactRequestRepository;

    public ContactService(final ContactRepository contactRepository,
            final AddressRepository addressRepository,
            final ContactRequestRepository contactRequestRepository) {
        this.contactRepository = contactRepository;
        this.addressRepository = addressRepository;
        this.contactRequestRepository = contactRequestRepository;
    }

    public List<ContactDTO> findAll() {
        final List<Contact> contacts = contactRepository.findAll(Sort.by("id"));
        return contacts.stream()
                .map(contact -> mapToDTO(contact, new ContactDTO()))
                .toList();
    }

    public ContactDTO get(final UUID id) {
        return contactRepository.findById(id)
                .map(contact -> mapToDTO(contact, new ContactDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final ContactDTO contactDTO) {
        final Contact contact = new Contact();
        mapToEntity(contactDTO, contact);
        return contactRepository.save(contact).getId();
    }

    public void update(final UUID id, final ContactDTO contactDTO) {
        final Contact contact = contactRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(contactDTO, contact);
        contactRepository.save(contact);
    }

    public void delete(final UUID id) {
        contactRepository.deleteById(id);
    }

    private ContactDTO mapToDTO(final Contact contact, final ContactDTO contactDTO) {
        contactDTO.setId(contact.getId());
        contactDTO.setName(contact.getName());
        contactDTO.setCpfCnpj(contact.getCpfCnpj());
        contactDTO.setEmail(contact.getEmail());
        contactDTO.setPhone(contact.getPhone());
        contactDTO.setCellPhone(contact.getCellPhone());
        contactDTO.setFax(contact.getFax());
        contactDTO.setMainActivityCode(contact.getMainActivityCode());
        contactDTO.setEconomicActivity(contact.getEconomicActivity());
        contactDTO.setAddress(contact.getAddress() == null ? null : contact.getAddress().getId());
        return contactDTO;
    }

    private Contact mapToEntity(final ContactDTO contactDTO, final Contact contact) {
        contact.setName(contactDTO.getName());
        contact.setCpfCnpj(contactDTO.getCpfCnpj());
        contact.setEmail(contactDTO.getEmail());
        contact.setPhone(contactDTO.getPhone());
        contact.setCellPhone(contactDTO.getCellPhone());
        contact.setFax(contactDTO.getFax());
        contact.setMainActivityCode(contactDTO.getMainActivityCode());
        contact.setEconomicActivity(contactDTO.getEconomicActivity());
        final Address address = contactDTO.getAddress() == null ? null : addressRepository.findById(contactDTO.getAddress())
                .orElseThrow(() -> new NotFoundException("address not found"));
        contact.setAddress(address);
        return contact;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Contact contact = contactRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final ContactRequest contactContactRequest = contactRequestRepository.findFirstByContact(contact);
        if (contactContactRequest != null) {
            referencedWarning.setKey("contact.contactRequest.contact.referenced");
            referencedWarning.addParam(contactContactRequest.getId());
            return referencedWarning;
        }
        return null;
    }

}
