package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Event;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.EventEmployee;
import wastecnologia.wapps.api.domain.entity.EventEquipament;
import wastecnologia.wapps.api.domain.entity.EventMenu;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.dto.EventCustomerDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.EventCustomerRepository;
import wastecnologia.wapps.api.repository.EventEmployeeRepository;
import wastecnologia.wapps.api.repository.EventEquipamentRepository;
import wastecnologia.wapps.api.repository.EventMenuRepository;
import wastecnologia.wapps.api.repository.EventRepository;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class EventCustomerService {

    private final EventCustomerRepository eventCustomerRepository;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final EventRepository eventRepository;
    private final EventEmployeeRepository eventEmployeeRepository;
    private final EventEquipamentRepository eventEquipamentRepository;
    private final EventMenuRepository eventMenuRepository;
    private final FileControlRepository fileControlRepository;

    public EventCustomerService(final EventCustomerRepository eventCustomerRepository,
            final CompanyRepository companyRepository, final CustomerRepository customerRepository,
            final EventRepository eventRepository,
            final EventEmployeeRepository eventEmployeeRepository,
            final EventEquipamentRepository eventEquipamentRepository,
            final EventMenuRepository eventMenuRepository,
            final FileControlRepository fileControlRepository) {
        this.eventCustomerRepository = eventCustomerRepository;
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.eventRepository = eventRepository;
        this.eventEmployeeRepository = eventEmployeeRepository;
        this.eventEquipamentRepository = eventEquipamentRepository;
        this.eventMenuRepository = eventMenuRepository;
        this.fileControlRepository = fileControlRepository;
    }

    public List<EventCustomerDTO> findAll() {
        final List<EventCustomer> eventCustomers = eventCustomerRepository.findAll(Sort.by("id"));
        return eventCustomers.stream()
                .map(eventCustomer -> mapToDTO(eventCustomer, new EventCustomerDTO()))
                .toList();
    }

    public EventCustomerDTO get(final UUID id) {
        return eventCustomerRepository.findById(id)
                .map(eventCustomer -> mapToDTO(eventCustomer, new EventCustomerDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EventCustomerDTO eventCustomerDTO) {
        final EventCustomer eventCustomer = new EventCustomer();
        mapToEntity(eventCustomerDTO, eventCustomer);
        return eventCustomerRepository.save(eventCustomer).getId();
    }

    public void update(final UUID id, final EventCustomerDTO eventCustomerDTO) {
        final EventCustomer eventCustomer = eventCustomerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(eventCustomerDTO, eventCustomer);
        eventCustomerRepository.save(eventCustomer);
    }

    public void delete(final UUID id) {
        eventCustomerRepository.deleteById(id);
    }

    private EventCustomerDTO mapToDTO(final EventCustomer eventCustomer,
            final EventCustomerDTO eventCustomerDTO) {
        eventCustomerDTO.setId(eventCustomer.getId());
        eventCustomerDTO.setType(eventCustomer.getType());
        eventCustomerDTO.setApproved(eventCustomer.getApproved());
        eventCustomerDTO.setCompany(eventCustomer.getCompany() == null ? null : eventCustomer.getCompany().getId());
        eventCustomerDTO.setCustomer(eventCustomer.getCustomer() == null ? null : eventCustomer.getCustomer().getId());
        eventCustomerDTO.setEvent(eventCustomer.getEvent() == null ? null : eventCustomer.getEvent().getId());
        return eventCustomerDTO;
    }

    private EventCustomer mapToEntity(final EventCustomerDTO eventCustomerDTO,
            final EventCustomer eventCustomer) {
        eventCustomer.setType(eventCustomerDTO.getType());
        eventCustomer.setApproved(eventCustomerDTO.getApproved());
        final Company company = eventCustomerDTO.getCompany() == null ? null : companyRepository.findById(eventCustomerDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        eventCustomer.setCompany(company);
        final Customer customer = eventCustomerDTO.getCustomer() == null ? null : customerRepository.findById(eventCustomerDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        eventCustomer.setCustomer(customer);
        final Event event = eventCustomerDTO.getEvent() == null ? null : eventRepository.findById(eventCustomerDTO.getEvent())
                .orElseThrow(() -> new NotFoundException("event not found"));
        eventCustomer.setEvent(event);
        return eventCustomer;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final EventCustomer eventCustomer = eventCustomerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final EventEmployee eventCustomerEventEmployee = eventEmployeeRepository.findFirstByEventCustomer(eventCustomer);
        if (eventCustomerEventEmployee != null) {
            referencedWarning.setKey("eventCustomer.eventEmployee.eventCustomer.referenced");
            referencedWarning.addParam(eventCustomerEventEmployee.getId());
            return referencedWarning;
        }
        final EventEquipament eventCustomerEventEquipament = eventEquipamentRepository.findFirstByEventCustomer(eventCustomer);
        if (eventCustomerEventEquipament != null) {
            referencedWarning.setKey("eventCustomer.eventEquipament.eventCustomer.referenced");
            referencedWarning.addParam(eventCustomerEventEquipament.getId());
            return referencedWarning;
        }
        final EventMenu eventCustomerEventMenu = eventMenuRepository.findFirstByEventCustomer(eventCustomer);
        if (eventCustomerEventMenu != null) {
            referencedWarning.setKey("eventCustomer.eventMenu.eventCustomer.referenced");
            referencedWarning.addParam(eventCustomerEventMenu.getId());
            return referencedWarning;
        }
        final FileControl eventCustomerFileControl = fileControlRepository.findFirstByEventCustomer(eventCustomer);
        if (eventCustomerFileControl != null) {
            referencedWarning.setKey("eventCustomer.fileControl.eventCustomer.referenced");
            referencedWarning.addParam(eventCustomerFileControl.getId());
            return referencedWarning;
        }
        return null;
    }

}
