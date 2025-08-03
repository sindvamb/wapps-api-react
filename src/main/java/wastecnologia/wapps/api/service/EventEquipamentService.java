package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Equipament;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.EventEquipament;
import wastecnologia.wapps.api.domain.dto.EventEquipamentDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.EquipamentRepository;
import wastecnologia.wapps.api.repository.EventCustomerRepository;
import wastecnologia.wapps.api.repository.EventEquipamentRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class EventEquipamentService {

    private final EventEquipamentRepository eventEquipamentRepository;
    private final CompanyRepository companyRepository;
    private final EquipamentRepository equipamentRepository;
    private final EventCustomerRepository eventCustomerRepository;

    public EventEquipamentService(final EventEquipamentRepository eventEquipamentRepository,
            final CompanyRepository companyRepository,
            final EquipamentRepository equipamentRepository,
            final EventCustomerRepository eventCustomerRepository) {
        this.eventEquipamentRepository = eventEquipamentRepository;
        this.companyRepository = companyRepository;
        this.equipamentRepository = equipamentRepository;
        this.eventCustomerRepository = eventCustomerRepository;
    }

    public List<EventEquipamentDTO> findAll() {
        final List<EventEquipament> eventEquipaments = eventEquipamentRepository.findAll(Sort.by("id"));
        return eventEquipaments.stream()
                .map(eventEquipament -> mapToDTO(eventEquipament, new EventEquipamentDTO()))
                .toList();
    }

    public EventEquipamentDTO get(final UUID id) {
        return eventEquipamentRepository.findById(id)
                .map(eventEquipament -> mapToDTO(eventEquipament, new EventEquipamentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EventEquipamentDTO eventEquipamentDTO) {
        final EventEquipament eventEquipament = new EventEquipament();
        mapToEntity(eventEquipamentDTO, eventEquipament);
        return eventEquipamentRepository.save(eventEquipament).getId();
    }

    public void update(final UUID id, final EventEquipamentDTO eventEquipamentDTO) {
        final EventEquipament eventEquipament = eventEquipamentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(eventEquipamentDTO, eventEquipament);
        eventEquipamentRepository.save(eventEquipament);
    }

    public void delete(final UUID id) {
        eventEquipamentRepository.deleteById(id);
    }

    private EventEquipamentDTO mapToDTO(final EventEquipament eventEquipament,
            final EventEquipamentDTO eventEquipamentDTO) {
        eventEquipamentDTO.setId(eventEquipament.getId());
        eventEquipamentDTO.setCompany(eventEquipament.getCompany() == null ? null : eventEquipament.getCompany().getId());
        eventEquipamentDTO.setEquipament(eventEquipament.getEquipament() == null ? null : eventEquipament.getEquipament().getId());
        eventEquipamentDTO.setEventCustomer(eventEquipament.getEventCustomer() == null ? null : eventEquipament.getEventCustomer().getId());
        return eventEquipamentDTO;
    }

    private EventEquipament mapToEntity(final EventEquipamentDTO eventEquipamentDTO,
            final EventEquipament eventEquipament) {
        final Company company = eventEquipamentDTO.getCompany() == null ? null : companyRepository.findById(eventEquipamentDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        eventEquipament.setCompany(company);
        final Equipament equipament = eventEquipamentDTO.getEquipament() == null ? null : equipamentRepository.findById(eventEquipamentDTO.getEquipament())
                .orElseThrow(() -> new NotFoundException("equipament not found"));
        eventEquipament.setEquipament(equipament);
        final EventCustomer eventCustomer = eventEquipamentDTO.getEventCustomer() == null ? null : eventCustomerRepository.findById(eventEquipamentDTO.getEventCustomer())
                .orElseThrow(() -> new NotFoundException("eventCustomer not found"));
        eventEquipament.setEventCustomer(eventCustomer);
        return eventEquipament;
    }

}
