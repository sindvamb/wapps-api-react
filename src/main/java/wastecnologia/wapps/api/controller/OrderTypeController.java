package wastecnologia.wapps.api.controller;

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
import wastecnologia.wapps.api.domain.dto.OrderTypeDTO;
import wastecnologia.wapps.api.service.OrderTypeService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/orderTypes", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderTypeController {

    private final OrderTypeService orderTypeService;

    public OrderTypeController(final OrderTypeService orderTypeService) {
        this.orderTypeService = orderTypeService;
    }

    @GetMapping
    public ResponseEntity<List<OrderTypeDTO>> getAllOrderTypes() {
        return ResponseEntity.ok(orderTypeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderTypeDTO> getOrderType(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderTypeService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrderType(
            @RequestBody @Valid final OrderTypeDTO orderTypeDTO) {
        final UUID createdId = orderTypeService.create(orderTypeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrderType(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderTypeDTO orderTypeDTO) {
        orderTypeService.update(id, orderTypeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrderType(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = orderTypeService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        orderTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
