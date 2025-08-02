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
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.model.OrderTrackingDTO;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.service.OrderTrackingService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/orderTrackings", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderTrackingResource {

    private final OrderTrackingService orderTrackingService;
    private final OrderRepository orderRepository;

    public OrderTrackingResource(final OrderTrackingService orderTrackingService,
            final OrderRepository orderRepository) {
        this.orderTrackingService = orderTrackingService;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderTrackingDTO>> getAllOrderTrackings() {
        return ResponseEntity.ok(orderTrackingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderTrackingDTO> getOrderTracking(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderTrackingService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrderTracking(
            @RequestBody @Valid final OrderTrackingDTO orderTrackingDTO) {
        final UUID createdId = orderTrackingService.create(orderTrackingDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrderTracking(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderTrackingDTO orderTrackingDTO) {
        orderTrackingService.update(id, orderTrackingDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderTracking(@PathVariable(name = "id") final UUID id) {
        orderTrackingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getId)));
    }

}
