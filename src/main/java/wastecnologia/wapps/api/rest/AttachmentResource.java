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
import wastecnologia.wapps.api.model.AttachmentDTO;
import wastecnologia.wapps.api.repos.TicketRepository;
import wastecnologia.wapps.api.service.AttachmentService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/attachments", produces = MediaType.APPLICATION_JSON_VALUE)
public class AttachmentResource {

    private final AttachmentService attachmentService;
    private final TicketRepository ticketRepository;

    public AttachmentResource(final AttachmentService attachmentService,
            final TicketRepository ticketRepository) {
        this.attachmentService = attachmentService;
        this.ticketRepository = ticketRepository;
    }

    @GetMapping
    public ResponseEntity<List<AttachmentDTO>> getAllAttachments() {
        return ResponseEntity.ok(attachmentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttachmentDTO> getAttachment(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(attachmentService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createAttachment(
            @RequestBody @Valid final AttachmentDTO attachmentDTO) {
        final UUID createdId = attachmentService.create(attachmentDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateAttachment(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final AttachmentDTO attachmentDTO) {
        attachmentService.update(id, attachmentDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteAttachment(@PathVariable(name = "id") final UUID id) {
        attachmentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ticketValues")
    public ResponseEntity<Map<UUID, UUID>> getTicketValues() {
        return ResponseEntity.ok(ticketRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Ticket::getId, Ticket::getId)));
    }

}
