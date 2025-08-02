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
import wastecnologia.wapps.api.domain.Address;
import wastecnologia.wapps.api.domain.EducationDegree;
import wastecnologia.wapps.api.domain.PartnerUnit;
import wastecnologia.wapps.api.domain.Role;
import wastecnologia.wapps.api.domain.UserStatus;
import wastecnologia.wapps.api.model.UserDTO;
import wastecnologia.wapps.api.repos.AddressRepository;
import wastecnologia.wapps.api.repos.EducationDegreeRepository;
import wastecnologia.wapps.api.repos.PartnerUnitRepository;
import wastecnologia.wapps.api.repos.RoleRepository;
import wastecnologia.wapps.api.repos.UserStatusRepository;
import wastecnologia.wapps.api.service.UserService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserResource {

    private final UserService userService;
    private final AddressRepository addressRepository;
    private final EducationDegreeRepository educationDegreeRepository;
    private final PartnerUnitRepository partnerUnitRepository;
    private final RoleRepository roleRepository;
    private final UserStatusRepository userStatusRepository;

    public UserResource(final UserService userService, final AddressRepository addressRepository,
            final EducationDegreeRepository educationDegreeRepository,
            final PartnerUnitRepository partnerUnitRepository, final RoleRepository roleRepository,
            final UserStatusRepository userStatusRepository) {
        this.userService = userService;
        this.addressRepository = addressRepository;
        this.educationDegreeRepository = educationDegreeRepository;
        this.partnerUnitRepository = partnerUnitRepository;
        this.roleRepository = roleRepository;
        this.userStatusRepository = userStatusRepository;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(userService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createUser(@RequestBody @Valid final UserDTO userDTO) {
        final UUID createdId = userService.create(userDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateUser(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final UserDTO userDTO) {
        userService.update(id, userDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteUser(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = userService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/addressValues")
    public ResponseEntity<Map<UUID, UUID>> getAddressValues() {
        return ResponseEntity.ok(addressRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Address::getId, Address::getId)));
    }

    @GetMapping("/educationDegreeValues")
    public ResponseEntity<Map<UUID, UUID>> getEducationDegreeValues() {
        return ResponseEntity.ok(educationDegreeRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(EducationDegree::getId, EducationDegree::getId)));
    }

    @GetMapping("/partnerUnitValues")
    public ResponseEntity<Map<UUID, UUID>> getPartnerUnitValues() {
        return ResponseEntity.ok(partnerUnitRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(PartnerUnit::getId, PartnerUnit::getId)));
    }

    @GetMapping("/roleValues")
    public ResponseEntity<Map<UUID, UUID>> getRoleValues() {
        return ResponseEntity.ok(roleRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Role::getId, Role::getId)));
    }

    @GetMapping("/userStatusValues")
    public ResponseEntity<Map<UUID, UUID>> getUserStatusValues() {
        return ResponseEntity.ok(userStatusRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(UserStatus::getId, UserStatus::getId)));
    }

}
