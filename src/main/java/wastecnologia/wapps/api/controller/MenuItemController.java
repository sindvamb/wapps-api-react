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
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.dto.MenuItemDTO;
import wastecnologia.wapps.api.repository.MenuRepository;
import wastecnologia.wapps.api.service.MenuItemService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/menuItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class MenuItemController {

    private final MenuItemService menuItemService;
    private final MenuRepository menuRepository;

    public MenuItemController(final MenuItemService menuItemService,
            final MenuRepository menuRepository) {
        this.menuItemService = menuItemService;
        this.menuRepository = menuRepository;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDTO>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDTO> getMenuItem(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(menuItemService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createMenuItem(@RequestBody @Valid final MenuItemDTO menuItemDTO) {
        final UUID createdId = menuItemService.create(menuItemDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateMenuItem(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final MenuItemDTO menuItemDTO) {
        menuItemService.update(id, menuItemDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = menuItemService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        menuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/menuValues")
    public ResponseEntity<Map<UUID, UUID>> getMenuValues() {
        return ResponseEntity.ok(menuRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Menu::getId, Menu::getId)));
    }

}
