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
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Equipament;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.model.EventEquipamentDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EquipamentRepository;
import wastecnologia.wapps.api.repos.EventCustomerRepository;
import wastecnologia.wapps.api.service.EventEquipamentService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/eventEquipaments", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventEquipamentResource {

    private final EventEquipamentService eventEquipamentService;
    private final CompanyRepository companyRepository;
    private final EquipamentRepository equipamentRepository;
    private final EventCustomerRepository eventCustomerRepository;

    public EventEquipamentResource(final EventEquipamentService eventEquipamentService,
            final CompanyRepository companyRepository,
            final EquipamentRepository equipamentRepository,
            final EventCustomerRepository eventCustomerRepository) {
        this.eventEquipamentService = eventEquipamentService;
        this.companyRepository = companyRepository;
        this.equipamentRepository = equipamentRepository;
        this.eventCustomerRepository = eventCustomerRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventEquipamentDTO>> getAllEventEquipaments() {
        return ResponseEntity.ok(eventEquipamentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEquipamentDTO> getEventEquipament(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(eventEquipamentService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEventEquipament(
            @RequestBody @Valid final EventEquipamentDTO eventEquipamentDTO) {
        final UUID createdId = eventEquipamentService.create(eventEquipamentDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEventEquipament(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EventEquipamentDTO eventEquipamentDTO) {
        eventEquipamentService.update(id, eventEquipamentDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEventEquipament(@PathVariable(name = "id") final UUID id) {
        eventEquipamentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

    @GetMapping("/equipamentValues")
    public ResponseEntity<Map<UUID, UUID>> getEquipamentValues() {
        return ResponseEntity.ok(equipamentRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Equipament::getId, Equipament::getId)));
    }

    @GetMapping("/eventCustomerValues")
    public ResponseEntity<Map<UUID, UUID>> getEventCustomerValues() {
        return ResponseEntity.ok(eventCustomerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(EventCustomer::getId, EventCustomer::getId)));
    }

}
