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
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.dto.CustomerOrderDTO;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.service.CustomerOrderService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/customerOrders", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public CustomerOrderController(final CustomerOrderService customerOrderService,
            final CustomerRepository customerRepository, final OrderRepository orderRepository) {
        this.customerOrderService = customerOrderService;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<CustomerOrderDTO>> getAllCustomerOrders() {
        return ResponseEntity.ok(customerOrderService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerOrderDTO> getCustomerOrder(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(customerOrderService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createCustomerOrder(
            @RequestBody @Valid final CustomerOrderDTO customerOrderDTO) {
        final UUID createdId = customerOrderService.create(customerOrderDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateCustomerOrder(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final CustomerOrderDTO customerOrderDTO) {
        customerOrderService.update(id, customerOrderDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCustomerOrder(@PathVariable(name = "id") final UUID id) {
        customerOrderService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customerValues")
    public ResponseEntity<Map<UUID, UUID>> getCustomerValues() {
        return ResponseEntity.ok(customerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Customer::getId, Customer::getId)));
    }

    @GetMapping("/orderValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderValues() {
        return ResponseEntity.ok(orderRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Order::getId, Order::getId)));
    }

}
