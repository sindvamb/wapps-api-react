package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.entity.TicketStatus;
import wastecnologia.wapps.api.domain.dto.TicketStatusDTO;
import wastecnologia.wapps.api.repository.TicketRepository;
import wastecnologia.wapps.api.repository.TicketStatusRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class TicketStatusService {

    private final TicketStatusRepository ticketStatusRepository;
    private final TicketRepository ticketRepository;

    public TicketStatusService(final TicketStatusRepository ticketStatusRepository,
            final TicketRepository ticketRepository) {
        this.ticketStatusRepository = ticketStatusRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<TicketStatusDTO> findAll() {
        final List<TicketStatus> ticketStatuses = ticketStatusRepository.findAll(Sort.by("id"));
        return ticketStatuses.stream()
                .map(ticketStatus -> mapToDTO(ticketStatus, new TicketStatusDTO()))
                .toList();
    }

    public TicketStatusDTO get(final UUID id) {
        return ticketStatusRepository.findById(id)
                .map(ticketStatus -> mapToDTO(ticketStatus, new TicketStatusDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final TicketStatusDTO ticketStatusDTO) {
        final TicketStatus ticketStatus = new TicketStatus();
        mapToEntity(ticketStatusDTO, ticketStatus);
        return ticketStatusRepository.save(ticketStatus).getId();
    }

    public void update(final UUID id, final TicketStatusDTO ticketStatusDTO) {
        final TicketStatus ticketStatus = ticketStatusRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(ticketStatusDTO, ticketStatus);
        ticketStatusRepository.save(ticketStatus);
    }

    public void delete(final UUID id) {
        ticketStatusRepository.deleteById(id);
    }

    private TicketStatusDTO mapToDTO(final TicketStatus ticketStatus,
            final TicketStatusDTO ticketStatusDTO) {
        ticketStatusDTO.setId(ticketStatus.getId());
        ticketStatusDTO.setCode(ticketStatus.getCode());
        ticketStatusDTO.setDescription(ticketStatus.getDescription());
        return ticketStatusDTO;
    }

    private TicketStatus mapToEntity(final TicketStatusDTO ticketStatusDTO,
            final TicketStatus ticketStatus) {
        ticketStatus.setCode(ticketStatusDTO.getCode());
        ticketStatus.setDescription(ticketStatusDTO.getDescription());
        return ticketStatus;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final TicketStatus ticketStatus = ticketStatusRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Ticket ticketStatusTicket = ticketRepository.findFirstByTicketStatus(ticketStatus);
        if (ticketStatusTicket != null) {
            referencedWarning.setKey("ticketStatus.ticket.ticketStatus.referenced");
            referencedWarning.addParam(ticketStatusTicket.getId());
            return referencedWarning;
        }
        return null;
    }

}
