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
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.dto.OrderFileControlDTO;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.service.OrderFileControlService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/orderFileControls", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderFileControlController {

    private final OrderFileControlService orderFileControlService;
    private final FileControlRepository fileControlRepository;
    private final OrderRepository orderRepository;

    public OrderFileControlController(final OrderFileControlService orderFileControlService,
            final FileControlRepository fileControlRepository,
            final OrderRepository orderRepository) {
        this.orderFileControlService = orderFileControlService;
        this.fileControlRepository = fileControlRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderFileControlDTO>> getAllOrderFileControls() {
        return ResponseEntity.ok(orderFileControlService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderFileControlDTO> getOrderFileControl(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderFileControlService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrderFileControl(
            @RequestBody @Valid final OrderFileControlDTO orderFileControlDTO) {
        final UUID createdId = orderFileControlService.create(orderFileControlDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrderFileControl(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderFileControlDTO orderFileControlDTO) {
        orderFileControlService.update(id, orderFileControlDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderFileControl(@PathVariable(name = "id") final UUID id) {
        orderFileControlService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/fileControlValues")
    public ResponseEntity<Map<UUID, UUID>> getFileControlValues() {
        return ResponseEntity.ok(fileControlRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(FileControl::getId, FileControl::getId)));
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getId)));
    }

}
