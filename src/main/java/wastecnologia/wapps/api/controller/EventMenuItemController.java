package wastecnologia.wapps.api.controller;

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
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.entity.MenuItem;
import wastecnologia.wapps.api.domain.dto.EventMenuItemDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.MenuItemRepository;
import wastecnologia.wapps.api.repository.MenuRepository;
import wastecnologia.wapps.api.service.EventMenuItemService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/eventMenuItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventMenuItemController {

    private final EventMenuItemService eventMenuItemService;
    private final CompanyRepository companyRepository;
    private final MenuItemRepository menuItemRepository;
    private final MenuRepository menuRepository;

    public EventMenuItemController(final EventMenuItemService eventMenuItemService,
            final CompanyRepository companyRepository, final MenuItemRepository menuItemRepository,
            final MenuRepository menuRepository) {
        this.eventMenuItemService = eventMenuItemService;
        this.companyRepository = companyRepository;
        this.menuItemRepository = menuItemRepository;
        this.menuRepository = menuRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventMenuItemDTO>> getAllEventMenuItems() {
        return ResponseEntity.ok(eventMenuItemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventMenuItemDTO> getEventMenuItem(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(eventMenuItemService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEventMenuItem(
            @RequestBody @Valid final EventMenuItemDTO eventMenuItemDTO) {
        final UUID createdId = eventMenuItemService.create(eventMenuItemDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEventMenuItem(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EventMenuItemDTO eventMenuItemDTO) {
        eventMenuItemService.update(id, eventMenuItemDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEventMenuItem(@PathVariable(name = "id") final UUID id) {
        eventMenuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

    @GetMapping("/menuItemValues")
    public ResponseEntity<Map<UUID, UUID>> getMenuItemValues() {
        return ResponseEntity.ok(menuItemRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(MenuItem::getId, MenuItem::getId)));
    }

    @GetMapping("/menuValues")
    public ResponseEntity<Map<UUID, UUID>> getMenuValues() {
        return ResponseEntity.ok(menuRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Menu::getId, Menu::getId)));
    }

}
