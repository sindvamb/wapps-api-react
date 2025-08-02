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
import wastecnologia.wapps.api.domain.Ticket;
import wastecnologia.wapps.api.model.TicketPropertyDTO;
import wastecnologia.wapps.api.repos.TicketRepository;
import wastecnologia.wapps.api.service.TicketPropertyService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/ticketProperties", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketPropertyResource {

    private final TicketPropertyService ticketPropertyService;
    private final TicketRepository ticketRepository;

    public TicketPropertyResource(final TicketPropertyService ticketPropertyService,
            final TicketRepository ticketRepository) {
        this.ticketPropertyService = ticketPropertyService;
        this.ticketRepository = ticketRepository;
    }

    @GetMapping
    public ResponseEntity<List<TicketPropertyDTO>> getAllTicketProperties() {
        return ResponseEntity.ok(ticketPropertyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketPropertyDTO> getTicketProperty(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(ticketPropertyService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createTicketProperty(
            @RequestBody @Valid final TicketPropertyDTO ticketPropertyDTO) {
        final UUID createdId = ticketPropertyService.create(ticketPropertyDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateTicketProperty(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final TicketPropertyDTO ticketPropertyDTO) {
        ticketPropertyService.update(id, ticketPropertyDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteTicketProperty(@PathVariable(name = "id") final UUID id) {
        ticketPropertyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ticketValues")
    public ResponseEntity<Map<UUID, UUID>> getTicketValues() {
        return ResponseEntity.ok(ticketRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Ticket::getId, Ticket::getId)));
    }

}
