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
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.model.SpecialNeedsDTO;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.service.SpecialNeedsService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/specialNeedss", produces = MediaType.APPLICATION_JSON_VALUE)
public class SpecialNeedsResource {

    private final SpecialNeedsService specialNeedsService;
    private final UserRepository userRepository;

    public SpecialNeedsResource(final SpecialNeedsService specialNeedsService,
            final UserRepository userRepository) {
        this.specialNeedsService = specialNeedsService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<SpecialNeedsDTO>> getAllSpecialNeedss() {
        return ResponseEntity.ok(specialNeedsService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialNeedsDTO> getSpecialNeeds(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(specialNeedsService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createSpecialNeeds(
            @RequestBody @Valid final SpecialNeedsDTO specialNeedsDTO) {
        final UUID createdId = specialNeedsService.create(specialNeedsDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateSpecialNeeds(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final SpecialNeedsDTO specialNeedsDTO) {
        specialNeedsService.update(id, specialNeedsDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteSpecialNeeds(@PathVariable(name = "id") final UUID id) {
        specialNeedsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, UUID>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getId, User::getId)));
    }

}
