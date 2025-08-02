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
import wastecnologia.wapps.api.domain.OrderStatus;
import wastecnologia.wapps.api.domain.OrderType;
import wastecnologia.wapps.api.domain.PartnerUnit;
import wastecnologia.wapps.api.domain.ProductArea;
import wastecnologia.wapps.api.domain.ProductCategory;
import wastecnologia.wapps.api.model.OrderDTO;
import wastecnologia.wapps.api.repos.OrderStatusRepository;
import wastecnologia.wapps.api.repos.OrderTypeRepository;
import wastecnologia.wapps.api.repos.PartnerUnitRepository;
import wastecnologia.wapps.api.repos.ProductAreaRepository;
import wastecnologia.wapps.api.repos.ProductCategoryRepository;
import wastecnologia.wapps.api.service.OrderService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderResource {

    private final OrderService orderService;
    private final OrderStatusRepository orderStatusRepository;
    private final OrderTypeRepository orderTypeRepository;
    private final PartnerUnitRepository partnerUnitRepository;
    private final ProductAreaRepository productAreaRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public OrderResource(final OrderService orderService,
            final OrderStatusRepository orderStatusRepository,
            final OrderTypeRepository orderTypeRepository,
            final PartnerUnitRepository partnerUnitRepository,
            final ProductAreaRepository productAreaRepository,
            final ProductCategoryRepository productCategoryRepository) {
        this.orderService = orderService;
        this.orderStatusRepository = orderStatusRepository;
        this.orderTypeRepository = orderTypeRepository;
        this.partnerUnitRepository = partnerUnitRepository;
        this.productAreaRepository = productAreaRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(orderService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createOrder(@RequestBody @Valid final OrderDTO orderDTO) {
        final UUID createdId = orderService.create(orderDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateOrder(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final OrderDTO orderDTO) {
        orderService.update(id, orderDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrder(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = orderService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        orderService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orderStatusValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderStatusValues() {
        return ResponseEntity.ok(orderStatusRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(OrderStatus::getId, OrderStatus::getId)));
    }

    @GetMapping("/orderTypeValues")
    public ResponseEntity<Map<UUID, UUID>> getOrderTypeValues() {
        return ResponseEntity.ok(orderTypeRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(OrderType::getId, OrderType::getId)));
    }

    @GetMapping("/partnerUnitValues")
    public ResponseEntity<Map<UUID, UUID>> getPartnerUnitValues() {
        return ResponseEntity.ok(partnerUnitRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(PartnerUnit::getId, PartnerUnit::getId)));
    }

    @GetMapping("/productAreaValues")
    public ResponseEntity<Map<UUID, UUID>> getProductAreaValues() {
        return ResponseEntity.ok(productAreaRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(ProductArea::getId, ProductArea::getId)));
    }

    @GetMapping("/productCategoryValues")
    public ResponseEntity<Map<UUID, UUID>> getProductCategoryValues() {
        return ResponseEntity.ok(productCategoryRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(ProductCategory::getId, ProductCategory::getId)));
    }

}
