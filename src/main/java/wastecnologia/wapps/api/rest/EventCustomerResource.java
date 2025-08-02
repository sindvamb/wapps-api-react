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
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.Event;
import wastecnologia.wapps.api.model.EventCustomerDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.CustomerRepository;
import wastecnologia.wapps.api.repos.EventRepository;
import wastecnologia.wapps.api.service.EventCustomerService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/eventCustomers", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventCustomerResource {

    private final EventCustomerService eventCustomerService;
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;
    private final EventRepository eventRepository;

    public EventCustomerResource(final EventCustomerService eventCustomerService,
            final CompanyRepository companyRepository, final CustomerRepository customerRepository,
            final EventRepository eventRepository) {
        this.eventCustomerService = eventCustomerService;
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventCustomerDTO>> getAllEventCustomers() {
        return ResponseEntity.ok(eventCustomerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventCustomerDTO> getEventCustomer(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(eventCustomerService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEventCustomer(
            @RequestBody @Valid final EventCustomerDTO eventCustomerDTO) {
        final UUID createdId = eventCustomerService.create(eventCustomerDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEventCustomer(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EventCustomerDTO eventCustomerDTO) {
        eventCustomerService.update(id, eventCustomerDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEventCustomer(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = eventCustomerService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        eventCustomerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

    @GetMapping("/customerValues")
    public ResponseEntity<Map<UUID, UUID>> getCustomerValues() {
        return ResponseEntity.ok(customerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Customer::getId, Customer::getId)));
    }

    @GetMapping("/eventValues")
    public ResponseEntity<Map<UUID, UUID>> getEventValues() {
        return ResponseEntity.ok(eventRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Event::getId, Event::getId)));
    }

}
