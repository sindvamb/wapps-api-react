package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Event;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.dto.EventDTO;
import wastecnologia.wapps.api.repository.EventCustomerRepository;
import wastecnologia.wapps.api.repository.EventRepository;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final FileControlRepository fileControlRepository;

    public EventService(final EventRepository eventRepository,
            final EventCustomerRepository eventCustomerRepository,
            final FileControlRepository fileControlRepository) {
        this.eventRepository = eventRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.fileControlRepository = fileControlRepository;
    }

    public List<EventDTO> findAll() {
        final List<Event> events = eventRepository.findAll(Sort.by("id"));
        return events.stream()
                .map(event -> mapToDTO(event, new EventDTO()))
                .toList();
    }

    public EventDTO get(final UUID id) {
        return eventRepository.findById(id)
                .map(event -> mapToDTO(event, new EventDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final EventDTO eventDTO) {
        final Event event = new Event();
        mapToEntity(eventDTO, event);
        return eventRepository.save(event).getId();
    }

    public void update(final UUID id, final EventDTO eventDTO) {
        final Event event = eventRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(eventDTO, event);
        eventRepository.save(event);
    }

    public void delete(final UUID id) {
        eventRepository.deleteById(id);
    }

    private EventDTO mapToDTO(final Event event, final EventDTO eventDTO) {
        eventDTO.setId(event.getId());
        eventDTO.setName(event.getName());
        eventDTO.setPlaceRealization(event.getPlaceRealization());
        eventDTO.setAddress(event.getAddress());
        eventDTO.setDescription(event.getDescription());
        eventDTO.setEventType(event.getEventType());
        eventDTO.setCity(event.getCity());
        eventDTO.setUf(event.getUf());
        eventDTO.setPrograming(event.getPrograming());
        eventDTO.setAssemblyInstructions(event.getAssemblyInstructions());
        eventDTO.setPartyPaymentDate(event.getPartyPaymentDate());
        eventDTO.setPartyDate(event.getPartyDate());
        eventDTO.setTimeStart(event.getTimeStart());
        eventDTO.setTimeEnd(event.getTimeEnd());
        eventDTO.setTentValue(event.getTentValue());
        eventDTO.setCirculatingValue(event.getCirculatingValue());
        eventDTO.setCreatorId(event.getCreatorId());
        eventDTO.setModifierId(event.getModifierId());
        eventDTO.setDeleterId(event.getDeleterId());
        eventDTO.setIsDeleted(event.getIsDeleted());
        eventDTO.setCreatedAt(event.getCreatedAt());
        eventDTO.setUpdatedAt(event.getUpdatedAt());
        eventDTO.setDeletedAt(event.getDeletedAt());
        return eventDTO;
    }

    private Event mapToEntity(final EventDTO eventDTO, final Event event) {
        event.setName(eventDTO.getName());
        event.setPlaceRealization(eventDTO.getPlaceRealization());
        event.setAddress(eventDTO.getAddress());
        event.setDescription(eventDTO.getDescription());
        event.setEventType(eventDTO.getEventType());
        event.setCity(eventDTO.getCity());
        event.setUf(eventDTO.getUf());
        event.setPrograming(eventDTO.getPrograming());
        event.setAssemblyInstructions(eventDTO.getAssemblyInstructions());
        event.setPartyPaymentDate(eventDTO.getPartyPaymentDate());
        event.setPartyDate(eventDTO.getPartyDate());
        event.setTimeStart(eventDTO.getTimeStart());
        event.setTimeEnd(eventDTO.getTimeEnd());
        event.setTentValue(eventDTO.getTentValue());
        event.setCirculatingValue(eventDTO.getCirculatingValue());
        event.setCreatorId(eventDTO.getCreatorId());
        event.setModifierId(eventDTO.getModifierId());
        event.setDeleterId(eventDTO.getDeleterId());
        event.setIsDeleted(eventDTO.getIsDeleted());
        event.setCreatedAt(eventDTO.getCreatedAt());
        event.setUpdatedAt(eventDTO.getUpdatedAt());
        event.setDeletedAt(eventDTO.getDeletedAt());
        return event;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Event event = eventRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final EventCustomer eventEventCustomer = eventCustomerRepository.findFirstByEvent(event);
        if (eventEventCustomer != null) {
            referencedWarning.setKey("event.eventCustomer.event.referenced");
            referencedWarning.addParam(eventEventCustomer.getId());
            return referencedWarning;
        }
        final FileControl eventFileControl = fileControlRepository.findFirstByEvent(event);
        if (eventFileControl != null) {
            referencedWarning.setKey("event.fileControl.event.referenced");
            referencedWarning.addParam(eventFileControl.getId());
            return referencedWarning;
        }
        return null;
    }

}
