package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderEmail;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.dto.OrderEmailDTO;
import wastecnologia.wapps.api.repository.OrderEmailRepository;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.repository.TicketRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class OrderEmailService {

    private final OrderEmailRepository orderEmailRepository;
    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;

    public OrderEmailService(final OrderEmailRepository orderEmailRepository,
            final OrderRepository orderRepository, final TicketRepository ticketRepository) {
        this.orderEmailRepository = orderEmailRepository;
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<OrderEmailDTO> findAll() {
        final List<OrderEmail> orderEmails = orderEmailRepository.findAll(Sort.by("id"));
        return orderEmails.stream()
                .map(orderEmail -> mapToDTO(orderEmail, new OrderEmailDTO()))
                .toList();
    }

    public OrderEmailDTO get(final UUID id) {
        return orderEmailRepository.findById(id)
                .map(orderEmail -> mapToDTO(orderEmail, new OrderEmailDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderEmailDTO orderEmailDTO) {
        final OrderEmail orderEmail = new OrderEmail();
        mapToEntity(orderEmailDTO, orderEmail);
        return orderEmailRepository.save(orderEmail).getId();
    }

    public void update(final UUID id, final OrderEmailDTO orderEmailDTO) {
        final OrderEmail orderEmail = orderEmailRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderEmailDTO, orderEmail);
        orderEmailRepository.save(orderEmail);
    }

    public void delete(final UUID id) {
        orderEmailRepository.deleteById(id);
    }

    private OrderEmailDTO mapToDTO(final OrderEmail orderEmail, final OrderEmailDTO orderEmailDTO) {
        orderEmailDTO.setId(orderEmail.getId());
        orderEmailDTO.setEmail(orderEmail.getEmail());
        orderEmailDTO.setOrder(orderEmail.getOrder() == null ? null : orderEmail.getOrder().getId());
        orderEmailDTO.setTicket(orderEmail.getTicket() == null ? null : orderEmail.getTicket().getId());
        return orderEmailDTO;
    }

    private OrderEmail mapToEntity(final OrderEmailDTO orderEmailDTO, final OrderEmail orderEmail) {
        orderEmail.setEmail(orderEmailDTO.getEmail());
        final Order order = orderEmailDTO.getOrder() == null ? null : orderRepository.findById(orderEmailDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderEmail.setOrder(order);
        final Ticket ticket = orderEmailDTO.getTicket() == null ? null : ticketRepository.findById(orderEmailDTO.getTicket())
                .orElseThrow(() -> new NotFoundException("ticket not found"));
        orderEmail.setTicket(ticket);
        return orderEmail;
    }

}
