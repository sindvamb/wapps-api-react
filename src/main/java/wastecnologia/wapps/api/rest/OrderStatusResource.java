package wastecnologia.wapps.api.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
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
import wastecnologia.wapps.api.model.OrderStatusDTO;
import wastecnologia.wapps.api.service.OrderStatusService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/orderStatuses", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderStatusResource {

    private final OrderStatusService orderStatusService;

    public OrderStatusResource(final OrderStatusService orderStatusService) {
        this.orderStatusService = orderStatusService;
    }

    @GetMapping
    public ResponseEntity<List<OrderStatusDTO>> getAllOrderStatuses() {
        return ResponseEntity.ok(orderStatusService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderStatusDTO> getOrderStatus(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderStatusService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrderStatus(
            @RequestBody @Valid final OrderStatusDTO orderStatusDTO) {
        final UUID createdId = orderStatusService.create(orderStatusDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrderStatus(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderStatusDTO orderStatusDTO) {
        orderStatusService.update(id, orderStatusDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderStatus(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = orderStatusService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        orderStatusService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
