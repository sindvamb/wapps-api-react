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
import wastecnologia.wapps.api.model.OrderPropertyDTO;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.service.OrderPropertyService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/orderProperties", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderPropertyResource {

    private final OrderPropertyService orderPropertyService;
    private final OrderRepository orderRepository;

    public OrderPropertyResource(final OrderPropertyService orderPropertyService,
            final OrderRepository orderRepository) {
        this.orderPropertyService = orderPropertyService;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderPropertyDTO>> getAllOrderProperties() {
        return ResponseEntity.ok(orderPropertyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderPropertyDTO> getOrderProperty(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderPropertyService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrderProperty(
            @RequestBody @Valid final OrderPropertyDTO orderPropertyDTO) {
        final UUID createdId = orderPropertyService.create(orderPropertyDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrderProperty(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderPropertyDTO orderPropertyDTO) {
        orderPropertyService.update(id, orderPropertyDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderProperty(@PathVariable(name = "id") final UUID id) {
        orderPropertyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getId)));
    }

}
