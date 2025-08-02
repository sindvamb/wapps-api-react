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
import wastecnologia.wapps.api.model.LoginHistoryDTO;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.service.LoginHistoryService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/loginHistories", produces = MediaType.APPLICATION_JSON_VALUE)
public class LoginHistoryResource {

    private final LoginHistoryService loginHistoryService;
    private final UserRepository userRepository;

    public LoginHistoryResource(final LoginHistoryService loginHistoryService,
            final UserRepository userRepository) {
        this.loginHistoryService = loginHistoryService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<LoginHistoryDTO>> getAllLoginHistories() {
        return ResponseEntity.ok(loginHistoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoginHistoryDTO> getLoginHistory(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(loginHistoryService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createLoginHistory(
            @RequestBody @Valid final LoginHistoryDTO loginHistoryDTO) {
        final UUID createdId = loginHistoryService.create(loginHistoryDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateLoginHistory(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final LoginHistoryDTO loginHistoryDTO) {
        loginHistoryService.update(id, loginHistoryDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteLoginHistory(@PathVariable(name = "id") final UUID id) {
        loginHistoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, UUID>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getId, User::getId)));
    }

}
