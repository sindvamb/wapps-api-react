package wastecnologia.wapps.api.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.Ticket;
import wastecnologia.wapps.api.model.OrderEmailDTO;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.repos.TicketRepository;
import wastecnologia.wapps.api.service.OrderEmailService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/orderEmails", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderEmailResource {

    private final OrderEmailService orderEmailService;
    private final OrderRepository orderRepository;
    private final TicketRepository ticketRepository;

    public OrderEmailResource(final OrderEmailService orderEmailService,
            final OrderRepository orderRepository, final TicketRepository ticketRepository) {
        this.orderEmailService = orderEmailService;
        this.orderRepository = orderRepository;
        this.ticketRepository = ticketRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderEmailDTO>> getAllOrderEmails() {
        return ResponseEntity.ok(orderEmailService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderEmailDTO> getOrderEmail(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderEmailService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrderEmail(
            @RequestBody @Valid final OrderEmailDTO orderEmailDTO) {
        final UUID createdId = orderEmailService.create(orderEmailDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrderEmail(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderEmailDTO orderEmailDTO) {
        orderEmailService.update(id, orderEmailDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderEmail(@PathVariable(name = "id") final UUID id) {
        orderEmailService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getId)));
    }

    @GetMapping("/ticketValues")
    public ResponseEntity<Map<UUID, UUID>> getTicketValues() {
        return ResponseEntity.ok(ticketRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Ticket::getId, Ticket::getId)));
    }

}
