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
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.Menu;
import wastecnologia.wapps.api.model.EventMenuDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EventCustomerRepository;
import wastecnologia.wapps.api.repos.MenuRepository;
import wastecnologia.wapps.api.service.EventMenuService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/eventMenus", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventMenuResource {

    private final EventMenuService eventMenuService;
    private final CompanyRepository companyRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final MenuRepository menuRepository;

    public EventMenuResource(final EventMenuService eventMenuService,
            final CompanyRepository companyRepository,
            final EventCustomerRepository eventCustomerRepository,
            final MenuRepository menuRepository) {
        this.eventMenuService = eventMenuService;
        this.companyRepository = companyRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.menuRepository = menuRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventMenuDTO>> getAllEventMenus() {
        return ResponseEntity.ok(eventMenuService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventMenuDTO> getEventMenu(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(eventMenuService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEventMenu(
            @RequestBody @Valid final EventMenuDTO eventMenuDTO) {
        final UUID createdId = eventMenuService.create(eventMenuDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEventMenu(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EventMenuDTO eventMenuDTO) {
        eventMenuService.update(id, eventMenuDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEventMenu(@PathVariable(name = "id") final UUID id) {
        eventMenuService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

    @GetMapping("/eventCustomerValues")
    public ResponseEntity<Map<UUID, UUID>> getEventCustomerValues() {
        return ResponseEntity.ok(eventCustomerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(EventCustomer::getId, EventCustomer::getId)));
    }

    @GetMapping("/menuValues")
    public ResponseEntity<Map<UUID, UUID>> getMenuValues() {
        return ResponseEntity.ok(menuRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Menu::getId, Menu::getId)));
    }

}
