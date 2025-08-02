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
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.TicketStatus;
import wastecnologia.wapps.api.model.TicketDTO;
import wastecnologia.wapps.api.repos.CustomerRepository;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.repos.TicketStatusRepository;
import wastecnologia.wapps.api.service.TicketService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/tickets", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketResource {

    private final TicketService ticketService;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final TicketStatusRepository ticketStatusRepository;

    public TicketResource(final TicketService ticketService,
            final CustomerRepository customerRepository, final OrderRepository orderRepository,
            final TicketStatusRepository ticketStatusRepository) {
        this.ticketService = ticketService;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.ticketStatusRepository = ticketStatusRepository;
    }

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getAllTickets() {
        return ResponseEntity.ok(ticketService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicket(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(ticketService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createTicket(@RequestBody @Valid final TicketDTO ticketDTO) {
        final UUID createdId = ticketService.create(ticketDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateTicket(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final TicketDTO ticketDTO) {
        ticketService.update(id, ticketDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteTicket(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = ticketService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        ticketService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customerValues")
    public ResponseEntity<Map<UUID, UUID>> getCustomerValues() {
        return ResponseEntity.ok(customerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Customer::getId, Customer::getId)));
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getId)));
    }

    @GetMapping("/ticketStatusValues")
    public ResponseEntity<Map<UUID, UUID>> getTicketStatusValues() {
        return ResponseEntity.ok(ticketStatusRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(TicketStatus::getId, TicketStatus::getId)));
    }

}
