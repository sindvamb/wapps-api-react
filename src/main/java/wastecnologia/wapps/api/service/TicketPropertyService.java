package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Ticket;
import wastecnologia.wapps.api.domain.TicketProperty;
import wastecnologia.wapps.api.model.TicketPropertyDTO;
import wastecnologia.wapps.api.repos.TicketPropertyRepository;
import wastecnologia.wapps.api.repos.TicketRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class TicketPropertyService {

    private final TicketPropertyRepository ticketPropertyRepository;
    private final TicketRepository ticketRepository;

    public TicketPropertyService(final TicketPropertyRepository ticketPropertyRepository,
            final TicketRepository ticketRepository) {
        this.ticketPropertyRepository = ticketPropertyRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<TicketPropertyDTO> findAll() {
        final List<TicketProperty> ticketProperties = ticketPropertyRepository.findAll(Sort.by("id"));
        return ticketProperties.stream()
                .map(ticketProperty -> mapToDTO(ticketProperty, new TicketPropertyDTO()))
                .toList();
    }

    public TicketPropertyDTO get(final UUID id) {
        return ticketPropertyRepository.findById(id)
                .map(ticketProperty -> mapToDTO(ticketProperty, new TicketPropertyDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final TicketPropertyDTO ticketPropertyDTO) {
        final TicketProperty ticketProperty = new TicketProperty();
        mapToEntity(ticketPropertyDTO, ticketProperty);
        return ticketPropertyRepository.save(ticketProperty).getId();
    }

    public void update(final UUID id, final TicketPropertyDTO ticketPropertyDTO) {
        final TicketProperty ticketProperty = ticketPropertyRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(ticketPropertyDTO, ticketProperty);
        ticketPropertyRepository.save(ticketProperty);
    }

    public void delete(final UUID id) {
        ticketPropertyRepository.deleteById(id);
    }

    private TicketPropertyDTO mapToDTO(final TicketProperty ticketProperty,
            final TicketPropertyDTO ticketPropertyDTO) {
        ticketPropertyDTO.setId(ticketProperty.getId());
        ticketPropertyDTO.setValue(ticketProperty.getValue());
        ticketPropertyDTO.setTicket(ticketProperty.getTicket() == null ? null : ticketProperty.getTicket().getId());
        return ticketPropertyDTO;
    }

    private TicketProperty mapToEntity(final TicketPropertyDTO ticketPropertyDTO,
            final TicketProperty ticketProperty) {
        ticketProperty.setValue(ticketPropertyDTO.getValue());
        final Ticket ticket = ticketPropertyDTO.getTicket() == null ? null : ticketRepository.findById(ticketPropertyDTO.getTicket())
                .orElseThrow(() -> new NotFoundException("ticket not found"));
        ticketProperty.setTicket(ticket);
        return ticketProperty;
    }

}
