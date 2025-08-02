package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Attachment;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderEmail;
import wastecnologia.wapps.api.domain.Ticket;
import wastecnologia.wapps.api.domain.TicketProperty;
import wastecnologia.wapps.api.domain.TicketStatus;
import wastecnologia.wapps.api.model.TicketDTO;
import wastecnologia.wapps.api.repos.AttachmentRepository;
import wastecnologia.wapps.api.repos.CustomerRepository;
import wastecnologia.wapps.api.repos.OrderEmailRepository;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.repos.TicketPropertyRepository;
import wastecnologia.wapps.api.repos.TicketRepository;
import wastecnologia.wapps.api.repos.TicketStatusRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final TicketStatusRepository ticketStatusRepository;
    private final AttachmentRepository attachmentRepository;
    private final OrderEmailRepository orderEmailRepository;
    private final TicketPropertyRepository ticketPropertyRepository;

    public TicketService(final TicketRepository ticketRepository,
            final CustomerRepository customerRepository, final OrderRepository orderRepository,
            final TicketStatusRepository ticketStatusRepository,
            final AttachmentRepository attachmentRepository,
            final OrderEmailRepository orderEmailRepository,
            final TicketPropertyRepository ticketPropertyRepository) {
        this.ticketRepository = ticketRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.ticketStatusRepository = ticketStatusRepository;
        this.attachmentRepository = attachmentRepository;
        this.orderEmailRepository = orderEmailRepository;
        this.ticketPropertyRepository = ticketPropertyRepository;
    }

    public List<TicketDTO> findAll() {
        final List<Ticket> tickets = ticketRepository.findAll(Sort.by("id"));
        return tickets.stream()
                .map(ticket -> mapToDTO(ticket, new TicketDTO()))
                .toList();
    }

    public TicketDTO get(final UUID id) {
        return ticketRepository.findById(id)
                .map(ticket -> mapToDTO(ticket, new TicketDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final TicketDTO ticketDTO) {
        final Ticket ticket = new Ticket();
        mapToEntity(ticketDTO, ticket);
        return ticketRepository.save(ticket).getId();
    }

    public void update(final UUID id, final TicketDTO ticketDTO) {
        final Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(ticketDTO, ticket);
        ticketRepository.save(ticket);
    }

    public void delete(final UUID id) {
        ticketRepository.deleteById(id);
    }

    private TicketDTO mapToDTO(final Ticket ticket, final TicketDTO ticketDTO) {
        ticketDTO.setId(ticket.getId());
        ticketDTO.setSolution(ticket.getSolution());
        ticketDTO.setDueDate(ticket.getDueDate());
        ticketDTO.setActive(ticket.getActive());
        ticketDTO.setCreatorId(ticket.getCreatorId());
        ticketDTO.setModifierId(ticket.getModifierId());
        ticketDTO.setDeleterId(ticket.getDeleterId());
        ticketDTO.setIsDeleted(ticket.getIsDeleted());
        ticketDTO.setCreatedAt(ticket.getCreatedAt());
        ticketDTO.setUpdatedAt(ticket.getUpdatedAt());
        ticketDTO.setDeletedAt(ticket.getDeletedAt());
        ticketDTO.setCustomer(ticket.getCustomer() == null ? null : ticket.getCustomer().getId());
        ticketDTO.setOrder(ticket.getOrder() == null ? null : ticket.getOrder().getId());
        ticketDTO.setTicketStatus(ticket.getTicketStatus() == null ? null : ticket.getTicketStatus().getId());
        return ticketDTO;
    }

    private Ticket mapToEntity(final TicketDTO ticketDTO, final Ticket ticket) {
        ticket.setSolution(ticketDTO.getSolution());
        ticket.setDueDate(ticketDTO.getDueDate());
        ticket.setActive(ticketDTO.getActive());
        ticket.setCreatorId(ticketDTO.getCreatorId());
        ticket.setModifierId(ticketDTO.getModifierId());
        ticket.setDeleterId(ticketDTO.getDeleterId());
        ticket.setIsDeleted(ticketDTO.getIsDeleted());
        ticket.setCreatedAt(ticketDTO.getCreatedAt());
        ticket.setUpdatedAt(ticketDTO.getUpdatedAt());
        ticket.setDeletedAt(ticketDTO.getDeletedAt());
        final Customer customer = ticketDTO.getCustomer() == null ? null : customerRepository.findById(ticketDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        ticket.setCustomer(customer);
        final Order order = ticketDTO.getOrder() == null ? null : orderRepository.findById(ticketDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        ticket.setOrder(order);
        final TicketStatus ticketStatus = ticketDTO.getTicketStatus() == null ? null : ticketStatusRepository.findById(ticketDTO.getTicketStatus())
                .orElseThrow(() -> new NotFoundException("ticketStatus not found"));
        ticket.setTicketStatus(ticketStatus);
        return ticket;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Attachment ticketAttachment = attachmentRepository.findFirstByTicket(ticket);
        if (ticketAttachment != null) {
            referencedWarning.setKey("ticket.attachment.ticket.referenced");
            referencedWarning.addParam(ticketAttachment.getId());
            return referencedWarning;
        }
        final OrderEmail ticketOrderEmail = orderEmailRepository.findFirstByTicket(ticket);
        if (ticketOrderEmail != null) {
            referencedWarning.setKey("ticket.orderEmail.ticket.referenced");
            referencedWarning.addParam(ticketOrderEmail.getId());
            return referencedWarning;
        }
        final TicketProperty ticketTicketProperty = ticketPropertyRepository.findFirstByTicket(ticket);
        if (ticketTicketProperty != null) {
            referencedWarning.setKey("ticket.ticketProperty.ticket.referenced");
            referencedWarning.addParam(ticketTicketProperty.getId());
            return referencedWarning;
        }
        return null;
    }

}
